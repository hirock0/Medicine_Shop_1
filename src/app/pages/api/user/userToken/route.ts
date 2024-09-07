import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DB_Connection/dbConnection";
import { getToken } from "next-auth/jwt";
import Jwt from "jsonwebtoken";
import { userSchemaStr } from "@/lib/Schema/model";
export async function GET(request: NextRequest): Promise<any> {
  await dbConnect();
  try {
    const nextAuthToken = await getToken({ req: request });
    const tokenData = request.cookies.get("token")?.value || "";
    const decodedToken = await Jwt.decode(tokenData);
    const token: any = nextAuthToken || decodedToken;
    const findUser = await userSchemaStr.findById({ _id: token?._id });
    return NextResponse.json({
      message: "Token is found",
      success: true,
      findUser,
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Toke is not found", success: true });
  }
}
