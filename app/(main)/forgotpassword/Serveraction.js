"use server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getcollection } from "@/app/Mongodb";
import sendEmail from "@/app/_serveractions/Sendmail";
import Forgotpassmail from "@/app/_mailtemplates/Forgotpassmail";

export const Sendpassresetmail = async (email) => {
  try {
    const { userscollection } = await getcollection();

    const userdata = await userscollection.findOne({ email });
    if (!userdata) return { status: 400, message: "User not found!" };

    const token = jwt.sign({ email }, process.env.jwt_secret, {
      expiresIn: "1h",
    });

    const template = Forgotpassmail(token);

    await sendEmail("Passsword Reset", [email], template);

    return { status: 200, message: "please check your mail inbox" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server error try again!" };
  }
};

export const Resetpassword = async (newpassword, token) => {
  try {
    const { userscollection } = await getcollection();
    const jwtres = jwt.verify(token, process.env.jwt_secret);
    const encrypterpassword = await bcrypt.hash(newpassword, 12);

    await userscollection.findOneAndUpdate(
      { email: jwtres?.email },
      { $set: { password: encrypterpassword } }
    );

    return { status: 200, message: "Password updated" };
  } catch (error) {
    console.log(error);
    if (error.name == "TokenExpiredError")
      return { status: 400, message: "Link expired!" };

    return { status: 500, message: "Server error try again!" };
  }
};
