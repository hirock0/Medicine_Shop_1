import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DB_Connection/dbConnection";
import cloudinary from "@/lib/cloudinary/cloudinary";
import { allMedicines } from "@/lib/Schema/model";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const reqBody = await request.json();
    const {
      medicineName,
      medicinePotency,
      medicinePrice,
      madeIn,
      descriptions,
      effect,
      sideEffect,
      doses,
      category,
      dilution,
      recentDate,
      medicineImage,
    } = reqBody;

    const upLoadResponse = await cloudinary.uploader.upload(medicineImage, {
      folder: "medicines",
    });
    const imageUrl = upLoadResponse?.secure_url;
    const image_public_id = upLoadResponse?.public_id;

    const preSave = await new allMedicines({
      medicineName,
      medicinePotency,
      medicinePrice,
      madeIn,
      descriptions,
      effect,
      sideEffect,
      doses,
      category,
      dilution,
      recentDate,
      image_public_id: image_public_id,
      medicineImage: imageUrl,
    });
    const saveData = await preSave.save();


    return NextResponse.json({
      message: "File is uploaded",
      success: true,
      saveData,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "File is not uploaded",
      success: false,
    });
  }
}
export async function GET(request:NextRequest,response:any){
  try{
    await dbConnect()
    const allMedicinesData = await allMedicines.find().sort({dateField:-1})
    return NextResponse.json({
      message: "File is found",
      success: true,allMedicinesData 
    });
  }catch(error:any){
    return NextResponse.json({
      message: "File is not found",
      success: false,
    });
  }
}
