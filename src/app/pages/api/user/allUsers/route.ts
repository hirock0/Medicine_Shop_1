import dbConnect from "@/lib/DB_Connection/dbConnection";
import { userSchemaStr } from "@/lib/Schema/model";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const finUsers = await userSchemaStr.find().sort({ dateField: -1 });
    return NextResponse.json({
      message: "All users found",
      success: true,
      finUsers,
    });
  } catch (error: any) {
    return NextResponse.json({ message: "No users found", success: false });
  }
}
