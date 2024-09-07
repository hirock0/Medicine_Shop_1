import dbConnect from "@/lib/DB_Connection/dbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.delete("token");
    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: "Something went wrong to logout",
      success: false,
    });
  }
}
