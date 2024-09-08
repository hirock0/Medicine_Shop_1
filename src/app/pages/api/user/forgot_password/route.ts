import dbConnect from "@/lib/DB_Connection/dbConnection";

import { NextResponse, NextRequest } from "next/server";
import { userSchemaStr } from "@/lib/Schema/model";
import { sendEmail } from "@/helper/mailer/mailer";
dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const findUser = await userSchemaStr.findOne({ email: email });
    if (!findUser) {
      return NextResponse.json({
        message: "Account is found.",
        success: false,
      });
    } else {
      await sendEmail({
        email,
        emailType: process.env.EMAIL_TYPE,
        userId: findUser._id,
      });
      return NextResponse.json({ message: "Account is found", success: true });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: "something went wrong",
      success: false,
    });
  }
}
