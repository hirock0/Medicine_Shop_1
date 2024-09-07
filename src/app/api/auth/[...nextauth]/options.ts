import dbConnect from "@/lib/DB_Connection/dbConnection";
import { userSchemaStr } from "@/lib/Schema/model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import Google from "next-auth/providers/google";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const findUser = await userSchemaStr.findOne({
            email: credentials?.email,
          });
          if (findUser == null) {
            return false;
          }
          const isPasswordCorrect = await bcryptjs.compare(
            credentials.password,
            findUser.password
          );
          if (isPasswordCorrect) {
            return findUser;
          } else {
            throw new Error("Password is incorrect");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }){
      await dbConnect();
      try {
        const findUser = await userSchemaStr.findOne({ email: user?.email });
        if (findUser !== null) {
          return findUser;
        } else {
          const PreSavedData = await new userSchemaStr({
            name: user?.name,
            email: user?.email,
            username: "",
            password: "",
            user_terms: "",
            recentDate: new Date().toLocaleDateString(),
            userImageUrl:user?.image,
            image_public_id: "",
            address: {
              village: "",
              thana: "",
              district: "",
              country: "",
            },
            contact: "",
          });
          const SaveData = await PreSavedData.save();
          return SaveData;
 
        }
      } catch (error: any) {
        throw new Error("SignIn failed");
      }
    },

    async jwt({ token, user }){
      await dbConnect();
      if (user) {
        const findUser = await userSchemaStr.findOne({ email: user?.email });
        token._id = findUser._id.toString();
        token.name = findUser.name;
      }
      return token;
    },
    async session({ session, token }){
      if (token) {
        session.user._id = token._id;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/user/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
