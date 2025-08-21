import React from "react";
import Clientpage from "./Clientpage";
import Verification from "@/app/Verifytoken";
import { notFound } from "next/navigation";
import { getcollection } from "@/app/Mongodb";

async function page({ searchParams }) {
  const tokenres = await Verification();
  if (!tokenres?.verified) notFound();

  const { edit = null } = await searchParams;
  let editdata = null;
  if (edit) {
    try {
      const { travelpackages, ObjectId } = await getcollection();
      const blog = await travelpackages.findOne({ _id: new ObjectId(edit) });
      blog._id = blog._id.toString();
      editdata = blog;
    } catch (error) {
      console.log(error);
    }
  }

  return <Clientpage editdata={editdata} />;
}

export default page;
