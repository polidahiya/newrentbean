"use server";
import { Deleteiamgefromurl, uploadImage } from "@/app/Cloudinary";
import Verification from "@/app/Verifytoken";
import { getcollection } from "../../Mongodb";

export const Addblogaction = async (formdata, editmode, deletedimages) => {
  try {
    const res = await Verification();
    if (!res?.verified) {
      return { status: 401, message: "Please login first" };
    }

    const { blogscollection, ObjectId } = await getcollection();

    if (editmode.mode) {
      deletedimages.forEach((image) =>
        Deleteiamgefromurl(image, "Rentbean/blog")
      );
    }

    let blogdata = [];

    const formDataArray = [];

    for (const [key, item] of formdata) {
      const [type, index] = key.split("-");

      if (type === "image") {
        if (item instanceof File) {
          const arrayBuffer = await item.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const res = await uploadImage(buffer, "Rentbean/blog");
          formDataArray.push({
            index: parseInt(index),
            data: { type: "image", content: res.secure_url },
          });
        } else {
          formDataArray.push({
            index: parseInt(index),
            data: JSON.parse(item),
          });
        }
      } else {
        formDataArray.push({ index: parseInt(index), data: JSON.parse(item) });
      }
    }

    formDataArray.sort((a, b) => a.index - b.index);

    blogdata = formDataArray.map((item) => item.data);

    if (editmode.mode) {
      await blogscollection.updateOne(
        { _id: new ObjectId(editmode.id) },
        { $set: { blogdata: blogdata, date: getCurrentDateFormatted() } }
      );
    } else {
      await blogscollection.insertOne({
        blogdata: blogdata,
        date: getCurrentDateFormatted(),
      });
    }

    return {
      status: 200,
      message: `Blog ${editmode.mode ? "updated" : "added"} successfully`,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server error!" };
  }
};

export const Deleteblog = async (blog) => {
  try {
    const { blogscollection, ObjectId } = await getcollection();
    const verification = await Adminverification();

    if (!verification) {
      return { status: 400, message: "Invalid user" };
    }
    // delete images
    blog?.blogdata.forEach((blog) => {
      if (blog?.type == "image")
        Deleteiamgefromurl(blog?.content, "Rentbean/blog");
    });

    await blogscollection.findOneAndDelete({
      _id: new ObjectId(blog._id),
    });

    return { status: 200, message: "Deleted successfully" };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};

function getCurrentDateFormatted() {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
