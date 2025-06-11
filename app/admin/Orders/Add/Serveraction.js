"use server";
import { getcollection } from "@/app/Mongodb";
import Verification from "@/app/Verifytoken";
import { v4 as uuidv4 } from "uuid";
import { getYYMMDD } from "@/app/_components/_helperfunctions/Yymmdd";
import { Send_mail_to_payment_group_id } from "@/app/_serveractions/Addorder";

export async function AddOrder(orderdata, sendmail) {
  try {
    const { orderscollection, sitedata, ObjectId } = await getcollection();
    const tokenres = await Verification();

    if (!tokenres?.verified) {
      return { status: 400, message: "Please login first" };
    }

    if (orderdata._id) {
      // update order
      const filter = { _id: new ObjectId(orderdata._id) };
      const { _id, ...updatedOrderData } = orderdata;
      await orderscollection.updateOne(filter, { $set: updatedOrderData });
      // send mial
      if (sendmail) Send_mail_to_payment_group_id(orderdata?.paymentGroupId);

      return { status: 200, message: "Updated successfully" };
    } else {
      // create new order
      const paymentGroupId = uuidv4();
      const createdAt = new Date();
      const updatedsitedata = await sitedata.findOneAndUpdate(
        {},
        { $inc: { orderNumber: 1 } },
        { returnDocument: "after", upsert: true }
      );
      const orderNumber = `Rb${getYYMMDD()}-${updatedsitedata?.orderNumber}`;

      await orderscollection.insertOne({
        ...orderdata,
        orderNumber,
        paymentGroupId,
        createdAt,
      });

      // send mial
      if (sendmail) Send_mail_to_payment_group_id(paymentGroupId);

      return { status: 200, message: "Order added successfully" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
}

export async function GetOrderById(orderId) {
  try {
    const tokenres = await Verification();

    if (!tokenres?.verified) {
      return { status: 400, message: "Please login first" };
    }
    const { orderscollection, ObjectId } = await getcollection();

    const order = await orderscollection.findOne({
      _id: new ObjectId(orderId),
    });

    if (!order) {
      return { status: 404, message: "Order not found" };
    }

    order._id = order._id.toString();
    return { status: 200, order };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { status: 500, message: "Server Error" };
  }
}
