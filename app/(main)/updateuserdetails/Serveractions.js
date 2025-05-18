"use server";
import { cookies } from "next/headers";
import Verification from "@/app/Verifytoken";
import { logintime } from "@/app/commondata";
import { getcollection } from "@/app/Mongodb";

// get all users
export async function updateuserdetails(newuserdetails) {
  try {
    const { userscollection } = await getcollection();
    const tokenres = await Verification("public");
    if (!tokenres) {
      return { status: 400, message: "Please login" };
    }

    const updateduser = await userscollection.findOneAndUpdate(
      { email: tokenres?.email },
      {
        $set: newuserdetails,
      },
      { returnNewDocument: true }
    );

    await addtoken({
      username: newuserdetails.username,
      email: tokenres.email,
      phonenum: newuserdetails.phonenum,
      address: newuserdetails.address,
    });

    if (updateduser) {
      return { status: 200, message: "Updated Successfully" };
    } else {
      return { status: 500, message: "Server error" };
    }
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
}

async function addtoken(userdata) {
  const allcookies = await cookies();
  allcookies.set("userdata", JSON.stringify(userdata), {
    maxAge: logintime,
  });
}
