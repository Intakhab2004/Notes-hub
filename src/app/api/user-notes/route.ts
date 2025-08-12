import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { auhtOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import notesModel from "@/models/Notes";


export async function GET(){
    const session = await getServerSession(auhtOptions);
    if(!session || !session.user){
        console.log("User not logged in");
        return NextResponse.json({
            success: false,
            status: 402,
            message: "Unauthorized user. Please login first"
        })
    }

    await dbConnect();

    try{
        const userId = session.user._id;
        const response = await notesModel.find({uploadedBy: userId});

        if(!response){
            console.log("Something went wrong while getting the user specific notes");
            return NextResponse.json({
                success: false,
                status: 404,
                message: "An error occured while getting notes"
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Notes fetched successfully",
            response
        })
        
    }
    catch(error: unknown){
        console.log("Something went wrong");
        if(error instanceof Error){
            console.log("An error occurred: ", error.message);
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