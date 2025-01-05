"use server";
import { uploadImage, Deleteiamgefromurl } from "@/app/Cloudinary";
import Verification from "@/app/Verifytoken";
import { getcollection } from "../../Mongodb";

export const Addproduct = async (addproduct, formData, deletedimages) => {
  try {
    const { Productscollection, ObjectId } = await getcollection();
    const res = await Verification("Add-Product");

    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    //
    for (let j = 0; j < addproduct?.images?.length; j++) {
      const image = addproduct?.images[j];
      if (image.length < 10) {
        const arrayBuffer = await formData.get(image).arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const cloudinaryres = await uploadImage(buffer);
        addproduct.images[j] = cloudinaryres.secure_url;
      }
    }
    // delete previous images
    deletedimages.forEach((image) => {
      Deleteiamgefromurl(image);
    });

    const date = new Date().getTime();

    // Add to MongoDB
    if (addproduct._id) {
      // to update a product
      const { _id, ...updateFields } = addproduct;

      await Productscollection.updateOne(
        { _id: new ObjectId(addproduct._id) },
        { $set: { ...updateFields, lastupdated: date } }
      );

      return { status: 200, message: "Updated successfully" };
    } else {
      // to add a product
      await Productscollection.insertOne({ ...addproduct, lastupdated: date });
      return { status: 200, message: "Added successfully" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
};

export const Deleteproduct = async (colorpalets, id) => {
  const { Productscollection, ObjectId } = await getcollection();
  const res = await Verification("Add-Product");

  if (!res?.verified) {
    return { status: 400, message: "Invalid user" };
  }
  //
  try {
    for (const item of colorpalets) {
      for (let j = 0; j < item.images.length; j++) {
        const url = item.images[j];
        Deleteiamgefromurl(url);
      }
    }

    // delete form mongodb
    await Productscollection.findOneAndDelete({ _id: new ObjectId(id) });
    return { status: 200, message: "Deleted successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};
