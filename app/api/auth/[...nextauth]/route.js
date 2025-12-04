import NextAuth from "@auth/core";
import Google from "@auth/core/providers/google";
import { getcollection } from "@/app/Mongodb";
import { generateToken } from "@/app/(main)/loginlogout/Serveractions";
import { logintime } from "@/app/commondata";

const handler = NextAuth({
  providers: [
    Google({
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
          // Login flow
          await generateToken({
            username: user.username,
            email: user.email,
            phonenum: user.phonenum,
            usertype: user.usertype,
            address: user.address,
          });
        } else {
          // Signup flow
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
      } catch (err) {
        console.error("Google SignIn Error:", err);
        return false;
      }
    },

    async session({ session }) {
      // You don't use Auth.js session, so just return it empty
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: logintime,
  },

  secret: process.env.jwt_secret,
});

export { handler as GET, handler as POST };
