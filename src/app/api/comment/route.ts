import { commentSchema } from "@/schemas/commentSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auhtOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import commentsModel from "@/models/Comments";
import mongoose from "mongoose";
import notesModel from "@/models/Notes";


export async function POST(request: NextRequest){
    await dbConnect()

    // Checking for authenticated user
    const session = await getServerSession(auhtOptions);
    if(!session || !session.user){
        return NextResponse.json({
            success: false,
            status: 403,
            message: "Only logged in user can make comments"
        })
    }

    try{
        const reqbody = await request.json();
        const {content, notesId}: {content: string, notesId: string} = reqbody;

        // Zod validation
        const result = commentSchema.safeParse({content});
        if(!result){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Please fill the details accurately"
            })
        }

        //Checking for notesId, if it is present or not
        if(!notesId){
            console.log("Commenting required notesId");
            return NextResponse.json({
                success: false,
                status: 402,
                message: "Something went wrong"
            })
        }

        //Created entry of comment in the DB
        const newComment = new commentsModel({
            content,
            notesId: new mongoose.Types.ObjectId(notesId),
            userId: new mongoose.Types.ObjectId(session.user._id)
        })

        await newComment.save();

        await newComment.populate({
            path: "userId",
            select: "username"
        })

        //creating entry in the notes model
        await notesModel.findByIdAndUpdate(
            notesId,
            {
                $push: {comments: newComment._id}
            },
            {new: true}
        )

        return NextResponse.json({
            success: true,
            status: 200,
            message: "You commented on a post",
            newComment
        })
    }

    catch(error: unknown){
        console.log("Something went wrong while making comment");
        if(error instanceof Error){
            console.log("An error occured: ", error.message);
        }
        else{
            console.log("an unknown error: ", error);
        }
        
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Internal server error"
        })
    }
}