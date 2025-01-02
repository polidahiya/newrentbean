"use server";
import { cookies } from "next/headers";
import { Userification } from "@/app/Verifytoken";
import { logintime } from "@/app/commondata";
import { getcollection } from "@/app/Mongodb";

// get all users
export async function updateuserdetails(newuserdetails) {
  try {
    const { userscollection } = await getcollection();
    const tokenres = await Userification();
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

    addtoken({
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

function addtoken(userdata) {
  cookies().set("userdata", JSON.stringify(userdata), {
    maxAge: logintime,
  });
}
