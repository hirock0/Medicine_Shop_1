import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DB_Connection/dbConnection";
import cloudinary from "@/lib/cloudinary/cloudinary";
import { allMedicines } from "@/lib/Schema/model";
export async function POST(request:NextRequest,response:any){
    try{
        await dbConnect()
        const reqPublicId = await request.json()
        const{public_id}=reqPublicId
        await cloudinary.uploader.destroy(public_id)
        await allMedicines.findOneAndDelete({image_public_id:public_id})
        return NextResponse.json({message:"Data deleted",success:true})
    }catch(error:any){
        return NextResponse.json({message:"Data not deleted",success:false})
    }
}