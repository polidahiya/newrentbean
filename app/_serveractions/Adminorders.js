"use server";
import Verification from "@/app/Verifytoken";
import { getcollection } from "@/app/Mongodb";

export const getadminorders = async (
  status = 0,
  page = 1,
  numberoforders = 20,
  searchterm,
  searchfilter = 0
) => {
  try {
    const { orderscollection } = await getcollection();
    const res = await Verification();

    // Check if user is authenticated
    if (!res?.verified) {
      return { status: 401, message: "Please login first" };
    }

    let query = {};

    const searchFilters = {
      0: {
        orderNumber: searchterm,
      },
      1: { paymentGroupId: { $regex: `^${searchterm}$`, $options: "i" } },
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
    const cursor = orderscollection.find(query);

    // Sort by latest first if status is 3, 4, 5, or 6
    if ([3, 4, 5, 6].includes(status)) {
      cursor.sort({ createdAt: -1 }); // -1 for descending (latest first)
    }

    const result = await cursor
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
    const res = await Verification();

    if (!res?.verified) {
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

// delete orders function
export const deleteorder = async (documentId) => {
  try {
    const { orderscollection, ObjectId } = await getcollection();
    const res = await Verification();

    if (!res?.verified) {
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
    const res = await Verification();

    if (!res?.verified) {
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


// export const getadminorders = async (
//   status = 0,
//   page = 1,
//   numberoforders = 20,
//   searchterm,
//   searchfilter = 0
// ) => {
//   try {
//     const { orderscollection, ObjectId } = await getcollection();
//     const res = await Verification();

//     if (!res?.verified) {
//       return { status: 401, message: "Please login first" };
//     }

//     let query = {};

//     const searchFilters = {
//       0: { orderNumber: searchterm },
//       1: { paymentGroupId: { $regex: `^${searchterm}$`, $options: "i" } },
//       2: { "userdata.username": { $regex: searchterm, $options: "i" } },
//       3: { "userdata.email": { $regex: `^${searchterm}$`, $options: "i" } },
//       4: { "userdata.phonenum": searchterm },
//       5: { "userdata.address": { $regex: searchterm, $options: "i" } },
//     };

//     if (searchterm) {
//       query = searchFilters[searchfilter] || {};
//     } else {
//       query = { status: status };
//     }

//     const totalposts = await orderscollection.countDocuments(query);

//     // Special case: status === 3 -> sort by return date ascending
//     if (status === 3 && !searchterm) {
//       const result = await orderscollection
//         .aggregate([
//           { $match: { status: 3 } },
//           {
//             $addFields: {
//               startDate: {
//                 $dateFromParts: {
//                   year: "$tenureStart.year",
//                   month: "$tenureStart.month",
//                   day: "$tenureStart.date",
//                 },
//               },
//             },
//           },
//           {
//             $addFields: {
//               durationInMs: {
//                 $multiply: [
//                   { $toInt: "$tenure.time" },
//                   {
//                     $switch: {
//                       branches: [
//                         {
//                           case: { $in: ["$tenure.type", ["day", "days"]] },
//                           then: 86400000,
//                         },
//                         {
//                           case: { $in: ["$tenure.type", ["week", "weeks"]] },
//                           then: 7 * 86400000,
//                         },
//                         {
//                           case: { $in: ["$tenure.type", ["month", "months"]] },
//                           then: 30 * 86400000,
//                         },
//                         {
//                           case: { $eq: ["$tenure.type", "season"] },
//                           then: 180 * 86400000,
//                         },
//                       ],
//                       default: 0,
//                     },
//                   },
//                 ],
//               },
//             },
//           },
//           {
//             $addFields: {
//               returnDate: { $add: ["$startDate", "$durationInMs"] },
//             },
//           },
//           { $sort: { returnDate: 1 } },
//           { $skip: (page - 1) * numberoforders },
//           { $limit: numberoforders },
//         ])
//         .toArray();

//       result.forEach((item) => (item._id = item._id.toString()));
//       return { status: 200, result, totalposts };
//     }

//     // Normal fetch for other statuses or searchterm present
//     const cursor = orderscollection.find(query);

//     if ([4, 5, 6].includes(status)) {
//       cursor.sort({ createdAt: -1 });
//     }

//     const result = await cursor
//       .limit(numberoforders)
//       .skip((page - 1) * numberoforders)
//       .toArray();

//     result.forEach((item) => (item._id = item._id.toString()));

//     return { status: 200, result, totalposts };
//   } catch (error) {
//     console.error("Error fetching admin orders:", error);
//     return { status: 500, message: "Server Error" };
//   }
// };
