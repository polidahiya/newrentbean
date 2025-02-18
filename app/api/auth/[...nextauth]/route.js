import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getcollection } from "@/app/Mongodb";
import { generateToken } from "@/app/(main)/loginlogout/Serveractions";
import { logintime } from "@/app/commondata";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        const email = profile.email;

        const { userscollection } = await getcollection();
        let user = await userscollection.findOne({ email });

        if (user) {
          // login
          await generateToken({
            username: user?.username,
            email: user?.email,
            phonenum: user?.phonenum,
            usertype: user?.usertype,
            address: user?.address,
          });
        } else {
          // signup
          const userdata = {
            username: profile.name || "",
            email,
            phonenum: "",
            address: "",
            usertype: "user",
          };
          await userscollection.insertOne(userdata);
          await generateToken(userdata);
        }
        return true;
      } catch (error) {
        console.error("Google SignIn Error:", error);
        return false;
      }
    },
    async session({ session }) {
      // Since we're storing auth data in cookies, NextAuth's session is not needed.
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: logintime,
  },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
