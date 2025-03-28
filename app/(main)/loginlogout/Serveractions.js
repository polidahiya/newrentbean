"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { logintime } from "@/app/commondata";
import { getcollection } from "@/app/Mongodb";

export const generateToken = async (userdata) => {
  const token = jwt.sign(
    { email: userdata?.email, usertype: userdata?.usertype },
    process.env.jwt_secret,
    {
      expiresIn: logintime,
    }
  );

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    maxAge: logintime,
    httpOnly: true,
    secure: true,
  });
  cookieStore.set("userdata", JSON.stringify(userdata), {
    maxAge: logintime,
  });
};

const findUserByEmail = async (email) => {
  const { userscollection } = await getcollection();
  return await userscollection.findOne({ email });
};

export const login = async (userdata) => {
  try {
    const user = await findUserByEmail(userdata.email);
    if (!user) {
      return { status: 400, message: "User not found" };
    }

    if (!user.password) {
      return { status: 400, message: "Wrong password" };
    }

    const isPasswordMatch = await bcrypt.compare(
      userdata.password,
      user.password
    );
    if (!isPasswordMatch) {
      return { status: 400, message: "Wrong password" };
    }

    await generateToken({
      username: user?.username,
      email: user?.email,
      phonenum: user?.phonenum,
      usertype: user?.usertype,
      address: user?.address,
    });

    return { status: 200, message: "Login successful" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server error!" };
  }
};

export const signup = async (userdata) => {
  try {
    const { userscollection } = await getcollection();
    const existingUser = await findUserByEmail(userdata.email);
    if (existingUser) {
      return { status: 400, message: "Email already registered" };
    }

    // Hash password
    userdata.password = await bcrypt.hash(userdata.password, 12);
    userdata.usertype = "user";

    const insertedUser = await userscollection.insertOne(userdata);

    if (!insertedUser) {
      return { status: 500, message: "Failed to create user" };
    }

    await generateToken({
      username: userdata.username,
      email: userdata.email,
      phonenum: userdata.phonenum,
      usertype: userdata.usertype,
      address: userdata.address,
    });

    return { status: 200, message: "Signup successful" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server error!" };
  }
};

export const logout = async () => {
  try {
    const cookieStore = await cookies();
    ["token", "next-auth.csrf-token", "userdata", "cart"].forEach((name) =>
      cookieStore.delete(name)
    );

    return { status: 200, message: "Logout successfully" };
  } catch (error) {
    console.error("Logout Error:", error);
    return { status: 500, message: "Server error" };
  }
};
