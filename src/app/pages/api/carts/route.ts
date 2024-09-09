import dbConnect from "@/lib/DB_Connection/dbConnection";
import { CartsStr } from "@/lib/Schema/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const {
      medicineImage,
      medicineId,
      userId,
      medicineName,
      medicinePotency,
      medicinePrice,
      recentDate,
    } = reqBody;

    const preSave = await new CartsStr({
      medicineImage,
      medicineId,
      userId,
      medicineName,
      medicinePotency,
      medicinePrice,
      recentDate,
    });
    await preSave.save();
    return NextResponse.json({ message: "Carts data is found", success: true });
  } catch (error: any) {
    return NextResponse.json({
      message: "Carts data is not found",
      success: false,
    });
  }
}
export async function GET() {
  try {
    const findCarts = await CartsStr.find().sort({ dateField: -1 });

    return NextResponse.json({
      message: "Carts data found",
      success: true,
      findCarts,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Carts data not found",
      success: false,
    });
  }
}
