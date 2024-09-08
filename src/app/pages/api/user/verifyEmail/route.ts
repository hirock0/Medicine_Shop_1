import dbConnect from "@/lib/DB_Connection/dbConnection";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { userSchemaStr } from "@/lib/Schema/model";
dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const findUser = await userSchemaStr.findOneAndUpdate(
      { token: token, tokenVerified: { $gt: Date.now() } },
      { password: hashedPassword }
    );
    if (!findUser) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    findUser.isVerified = true;
    findUser.token = undefined;
    findUser.tokenVerified = undefined;
    await findUser.save();
    return NextResponse.json({ message: "Email verified", success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
