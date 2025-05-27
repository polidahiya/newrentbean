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
    const { orderscollection, ObjectId } = await getcollection();
    const res = await Verification();

    if (!res?.verified) {
      return { status: 401, message: "Please login first" };
    }

    let query = {};

    const searchFilters = {
      0: { orderNumber: searchterm },
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

    const totalposts = await orderscollection.countDocuments(query);

    let result;

    if (status === 3 && !searchterm) {
      // Fetch all and sort by return date on server
      result = await orderscollection.find(query).toArray();

      // Compute return date and sort
      const getDurationInMs = (time, type) => {
        const t = parseInt(time);
        const unit = type.toLowerCase();
        if (["day", "days"].includes(unit)) return t * 86400000;
        if (["week", "weeks"].includes(unit)) return t * 7 * 86400000;
        if (["month", "months"].includes(unit)) return t * 30 * 86400000;
        if (unit === "season") return t * 180 * 86400000;
        return 0;
      };

      result.forEach((item) => {
        try {
          const { date, month, year } = item.product.tenureStart;
          const { time, type } = item.product.tenure;
          const startDate = new Date(year, month - 1, date);
          const returnDate = new Date(
            startDate.getTime() + getDurationInMs(time, type)
          );
          item.returnDate = returnDate;
        } catch (error) {
          console.log(error);
        }
      });

      result.sort((a, b) => new Date(a.returnDate) - new Date(b.returnDate));

      // Paginate after sorting
      result = result.slice((page - 1) * numberoforders, page * numberoforders);
    } else {
      const cursor = orderscollection.find(query);

      if ([4, 5, 6].includes(status)) {
        cursor.sort({ createdAt: -1 });
      }

      result = await cursor
        .limit(numberoforders)
        .skip((page - 1) * numberoforders)
        .toArray();
    }

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
