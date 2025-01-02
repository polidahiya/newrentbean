"use server";
import { Adminverification } from "@/app/Verifytoken";
import { getcollection } from "@/app/Mongodb";

export const getadminorders = async (
  status = 0,
  page = 1,
  numberoforders = 20,
  searchterm,
  searchfilter = 0
) => {
  try {
    const { orderscollection, ObjectId } = await getcollection();
    const tokenres = await Adminverification();

    // Check if user is authenticated
    if (!tokenres) {
      return { status: 401, message: "Please login first" };
    }

    let query = {};

    const searchFilters = {
      0: {
        _id: ObjectId.isValid(searchterm) ? new ObjectId(searchterm) : null,
      },
      1: { mihpayid: { $regex: `^${searchterm}$`, $options: "i" } },
      2: { "userdata.username": { $regex: searchterm, $options: "i" } },
      3: { "userdata.email": { $regex: `^${searchterm}$`, $options: "i" } },
      4: { "userdata.phonenum": searchterm },
      5: { "userdata.address": { $regex: searchterm, $options: "i" } },
    };

    if (searchterm) {
      query = searchFilters[searchfilter] || {};
    } else {
      query = { status: status };
    }

    // Get total number of posts for pagination
    const totalposts = await orderscollection.countDocuments(query);

    // Fetch the orders with pagination
    const result = await orderscollection
      .find(query)
      .limit(numberoforders)
      .skip((page - 1) * numberoforders)
      .toArray();

    // Convert _id to string to avoid issues with MongoDB ObjectId
    result.forEach((item) => (item._id = item._id.toString()));

    return { status: 200, result, totalposts };
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return { status: 500, message: "Server Error" };
  }
};

// change order status
export const changestatus = async (documentId, status) => {
  try {
    const { orderscollection, ObjectId } = await getcollection();
    const tokenres = await Adminverification();

    if (!tokenres) {
      return { status: 400, message: "Please login first" };
    }

    const filter = { _id: new ObjectId(documentId) };

    if (status == 3) {
      await orderscollection.updateOne(filter, {
        $set: { status: status, delivered_date: new Date() },
      });
    } else {
      await orderscollection.updateOne(filter, { $set: { status: status } });
    }
    return { status: 200, message: "Status Updated" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};

// change product status
export const changeproductstatus = async (orderId, productIndex, newStatus) => {
  try {
    const { orderscollection, ObjectId } = await getcollection();
    const tokenres = await Adminverification();

    if (!tokenres) {
      return { status: 400, message: "Please login first" };
    }

    const filter = { _id: new ObjectId(orderId) };

    // Fetch the order to check if the productIndex exists
    const order = await orderscollection.findOne(filter);

    if (!order) {
      return { status: 404, message: "Order not found" };
    }

    // Check if productIndex is valid
    if (productIndex >= order.products.length || productIndex < 0) {
      return { status: 400, message: "Invalid product index" };
    }

    // Proceed to update the product status in the array
    const result = await orderscollection.updateOne(filter, {
      $set: { [`products.${productIndex}.status`]: newStatus },
    });

    if (result.modifiedCount === 0) {
      return { status: 500, message: "Failed to update status" };
    }

    return { status: 200, message: "Status updated successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};

// delete orders function
export const deleteorder = async (documentId) => {
  try {
    const { orderscollection, ObjectId } = await getcollection();
    const tokenres = await Adminverification();

    if (!tokenres) {
      return { status: 400, message: "Please login first" };
    }
    const filter = { _id: new ObjectId(documentId) };

    const result = await orderscollection.deleteOne(filter);

    if (result.deletedCount === 1) {
      return { status: 200, message: "Deleted Successfully" };
    } else {
      return { status: 500, message: "Delete Failed" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};

// update note
export const updatenote = async (documentId, note) => {
  try {
    const { orderscollection, ObjectId } = await getcollection();
    const tokenres = await Adminverification();

    if (!tokenres) {
      return { message: "Please login first" };
    }

    const filter = { _id: new ObjectId(documentId) };
    const result = await orderscollection.updateOne(
      filter,
      {
        $set: {
          note: note,
        },
      },
      { upsert: true }
    );

    if (result.modifiedCount === 1) {
      return { message: "Update Successful" };
    } else {
      return { message: "Update Failed" };
    }
  } catch (error) {
    console.log(error);
    return { message: "Server Error" };
  }
};
