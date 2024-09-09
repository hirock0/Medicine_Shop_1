import dbConnect from "@/lib/DB_Connection/dbConnection";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest){
    await dbConnect()
    try{
        
    }catch(error:any){

    }
}