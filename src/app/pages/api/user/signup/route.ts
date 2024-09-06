import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DB_Connection/dbConnection";
import cloudinary from "@/lib/cloudinary/cloudinary";
import { allMedicines, userSchemaStr } from "@/lib/Schema/model";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const reqBody = await request.json();
    const {
      name,
      email,
      username,
      password,
      user_terms,
      recentDate,
      userImage,
    } = reqBody;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const upLoadResponse = await cloudinary.uploader.upload(userImage, {
      folder: "user_images",
    });
    const imageUrl = upLoadResponse?.secure_url;
    const image_public_id = upLoadResponse?.public_id;
    const preSaved = await new userSchemaStr({
      name,
      email,
      username,
      password: hashedPassword,
      user_terms,
      recentDate,
      userImageUrl: imageUrl,
      image_public_id: image_public_id,
      address: {
        village: "",
        thana: "",
        district: "",
        country: "",
      },
      contact: "",
    });

    const saveData = await preSaved.save();

    const tokenData = {
      id: saveData._id,
      name: saveData.name,
      email: saveData.email,
    };
    const token = await Jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "File is uploaded",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: "File is not uploaded",
      success: false,
    });
  }
}
// export async function GET(request:NextRequest,response:any){
//   try{
//     await dbConnect()
//     const allMedicinesData = await allMedicines.find().sort({dateField:-1})
//     return NextResponse.json({
//       message: "File is found",
//       success: true,allMedicinesData
//     });
//   }catch(error:any){
//     return NextResponse.json({
//       message: "File is not found",
//       success: false,
//     });
//   }
// }
