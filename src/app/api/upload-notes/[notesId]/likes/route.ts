import { auhtOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import notesModel from "@/models/Notes";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, context: {params: Promise<{notesId: string}>}){
    const session = await getServerSession(auhtOptions);
    if(!session || !session.user){
        console.log("Unauthorized user");
        return NextResponse.json({
            success: false,
            status: 402,
            message: "Only logged in user can like the post"
        })
    }

    await dbConnect();

    try{
        const {userId} = await request.json();
        const {notesId} = await context.params;

        //Finding note with this id
        const currentNote = await notesModel.findById(notesId);
        if(!currentNote){
            return NextResponse.json({
                success: false,
                status: 404,
                message: "Note not found"
            })
        }

        const alreadyLiked = currentNote.likes.includes(userId);
        if(alreadyLiked){
            console.log("You unliked the post");
            currentNote.likes = (currentNote.likes as mongoose.Types.ObjectId[]).filter((id) => id.toString() !== userId.toString());
        }
        else{
            console.log("You liked the post");
            currentNote.likes.push(userId);
        }
        await currentNote.save();

        return NextResponse.json({
            success: true,
            status: 200,
            liked: !alreadyLiked,
            totalLikes: currentNote.likes.length
        })

    }
    catch(error: unknown){
        console.log("Something went wrong while liking");
        if(error instanceof Error){
            console.log("An error occured: ", error.message);
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