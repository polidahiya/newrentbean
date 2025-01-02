"use server";
import { cookies } from "next/headers";
import { Adminverification } from "@/app/Verifytoken";
import jwt from "jsonwebtoken";
import { getcollection } from "../Mongodb";

// auto login
export async function autologin() {
  try {
    let result = await Adminverification();

    if (result) {
      return { status: 200, message: "Login successfull" };
    } else {
      return { status: 400, message: "Invalid user" };
    }
  } catch (error) {
    return { status: 500, message: "Internal server error" };
  }
}

// password login
export async function passwordlogin(req) {
  try {
    const { Admindatacollection } = await getcollection();
    let password = req?.password;

    const admindata = await Admindatacollection.findOne();

    if (password == admindata?.password) {
      const token = jwt.sign(
        { email: process.env.admin_email },
        process.env.jwt_secret,
        {
          expiresIn: "24h",
        }
      );

      cookies().set("admintoken", token, {
        maxAge: 3600 * 24,
        httpOnly: true,
        secure: true,
      });
      return { status: 200, message: "Login successfull" };
    } else {
      return { status: 500, message: "Wrong password" };
    }
  } catch (error) {}
  return { status: 500, message: "Server Error!" };
}
