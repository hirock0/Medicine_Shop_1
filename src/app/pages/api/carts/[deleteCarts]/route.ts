import dbConnect from "@/lib/DB_Connection/dbConnection";
import { CartsStr } from "@/lib/Schema/model";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest, res: any) {
  await dbConnect();
  try {
    const reqId = (await res?.params?.deleteCarts) || "";
    const CartId = { _id: reqId };
    await CartsStr.findByIdAndDelete(CartId);
    return NextResponse.json({
      message: "Carts data found",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Carts data not found",
      success: false,
    });
  }
}
