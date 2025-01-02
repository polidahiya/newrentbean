"use server";
import { Adminverification } from "@/app/Verifytoken";
import { getcollection } from "../Mongodb";

export async function Sendmessage(data) {
  try {
    const { contactmessages } = await getcollection();
    const { name, email, message, subject } = data;
    if (!name || !email || !message || !subject) {
      return { status: 400, message: "Missing required fields" };
    }

    await contactmessages.insertOne({
      name,
      email,
      message,
      subject,
      viewed: false,
    });

    return { status: 200, message: "Message sent!" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error, please try again later" };
  }
}

export async function Getmessage(type) {
  try {
    const { contactmessages } = await getcollection();
    const tokenres = await Adminverification();
    if (!tokenres) return { status: 400, message: "Invalid user" };

    let messages;
    switch (type) {
      case "all":
        messages = await contactmessages.find({ viewed: false }).toArray();
        break;
      case "viewed":
        messages = await contactmessages.find({ viewed: true }).toArray();
        break;

      default:
        break;
    }
    messages.map((item) => (item._id = item._id.toString()));
    console.log(messages);

    return { status: 200, message: messages.length + "new messages", messages };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error, please try again later" };
  }
}

export const changestatus = async (documentId, viewed) => {
  try {
    const { contactmessages, ObjectId } = await getcollection();
    const tokenres = await Adminverification();
    if (!tokenres) return { status: 400, message: "Invalid user" };

    const filter = { _id: new ObjectId(documentId) };

    await contactmessages.updateOne(filter, { $set: { viewed: viewed } });

    return { status: 200, message: "Status Updated" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error, please try again later" };
  }
};

// delete orders function
export const deletemessage = async (documentId) => {
  try {
    const { contactmessages, ObjectId } = await getcollection();
    const tokenres = await Adminverification();
    if (!tokenres) return { status: 400, message: "Invalid user" };

    const filter = { _id: new ObjectId(documentId) };

    await contactmessages.deleteOne(filter);

    return { status: 200, message: "Deleted Successfully" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error, please try again later" };
  }
};
