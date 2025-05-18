"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { logintime } from "@/app/commondata";
import { getcollection } from "@/app/Mongodb";

const generateToken = async (data, userdata) => {
  const allcookies = await cookies();

  const token = jwt.sign(data, process.env.jwt_secret, {
    expiresIn: logintime,
  });

  allcookies.set("token", token, {
    maxAge: logintime,
    httpOnly: true,
    secure: true,
  });
  allcookies.set("userdata", JSON.stringify(userdata), {
    maxAge: logintime,
  });
};

const findUserByEmail = async (email) => {
  const { userscollection } = await getcollection();
  return await userscollection.findOne({ email });
};

export const Userlogin = async (userdata, step) => {
  try {
    const { userscollection } = await getcollection();
    if (step == 1) {
      const user = await findUserByEmail(userdata.email);
      return { status: 200, userexist: user ? true : false };
    }
    if (step == 2) {
      const user = await findUserByEmail(userdata.email);
      const isPasswordMatch = await bcrypt.compare(
        userdata.password,
        user.password
      );
      if (!isPasswordMatch) {
        return { status: 400, message: "Wrong password" };
      }
      await generateToken(
        { email: userdata.email },
        {
          username: user.username,
          email: user.email,
          phonenum: user.phonenum,
          address: user.address,
        }
      );
      return { status: 200, message: "Login successful" };
    }

    if (step == 3) {
      const existingUser = await findUserByEmail(userdata.email);
      if (existingUser) {
        return { status: 400, message: "Email already registered" };
      }

      // Hash password
      userdata.password = await bcrypt.hash(userdata.password, 12);

      const insertedUser = await userscollection.insertOne(userdata);
      if (!insertedUser) {
        return { status: 500, message: "Failed to create user" };
      }

      await generateToken(
        { email: userdata.email },
        {
          username: userdata.username,
          email: userdata.email,
          phonenum: userdata.phonenum,
          address: userdata.address,
        }
      );

      return { status: 200, message: "Signup successful" };
    }
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

    const insertedUser = await userscollection.insertOne(userdata);
    if (!insertedUser) {
      return { status: 500, message: "Failed to create user" };
    }

    await generateToken(
      { email: userdata.email },
      {
        username: userdata.username,
        email: userdata.email,
        phonenum: userdata.phonenum,
        address: userdata.address,
      }
    );

    return { status: 200, message: "Signup successful" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server error!" };
  }
};

export const logout = async () => {
  try {
    const allcookies = await cookies();

    allcookies?.delete("token");
    allcookies?.delete("userdata");
    allcookies?.delete("cart");
    return { status: 200, message: "Logout successfully" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server error" };
  }
};
