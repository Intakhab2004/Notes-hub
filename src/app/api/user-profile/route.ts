import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auhtOptions } from "../auth/[...nextauth]/options";
import profileModel from "@/models/Profile";
import userModel from "@/models/User";
import notesModel from "@/models/Notes";

void profileModel;

export async function GET(){
    await dbConnect();

    const session = await getServerSession(auhtOptions);
    if(!session || !session.user){
        console.log("User not logged in");
        return NextResponse.json({
            success: false,
            status: 401,
            message: "User not logged in"
        })
    }

    try{
        const response = await userModel.findOne({_id: session.user._id}).populate({
            path: "userDetails",
            select: "firstName lastName gender dateOfBirth about contactNumber"
        });
        
        if(!response){
            return NextResponse.json({
                success: false,
                status: 404,
                message: "User not found"
            })
        }

        const uploadedNotesByUser = await notesModel.find({uploadedBy: session.user._id});

        return NextResponse.json({
            success: true,
            status: 200,
            message: "User details fetched successfully",
            response,
            notesLength: uploadedNotesByUser.length
        })
    }
    catch(error: unknown){
        if(error instanceof Error){
            console.log("Something went wrong: ", error.message);
        }
        else{
            console.log("An unknown error: ", error);
        }
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Internal server error"
        })
    }
}