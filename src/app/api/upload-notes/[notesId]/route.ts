import dbConnect from "@/lib/dbConnect";
import notesModel from "@/models/Notes";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auhtOptions } from "../../auth/[...nextauth]/options";
import commentsModel from "@/models/Comments";
import cloudinary from "@/lib/cloudinaryConfig";


export async function GET(request: NextRequest, context: {params: Promise<{notesId: string}>}){
    await dbConnect();

    try{
        const {notesId} = await context.params;
        const noteDetails = await notesModel.findOne({_id: notesId})
                                                                .populate({
                                                                    path: "uploadedBy",
                                                                    select: "username"
                                                                })
                                                                .populate({
                                                                    path: "comments",
                                                                    populate: {
                                                                        path: "userId",
                                                                        select: "username"
                                                                    }
                                                                });
        if(!noteDetails){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Issue while fetching the note details"
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Note details fetched successfully",
            noteDetails
        })
    }
    catch(error: unknown){
        console.log("Something went wrong while fetching the details");
        if(error instanceof Error){
            console.log("An error occured: ", error.message);
        }
        else{
            console.log("An inknown error: ", error);
        }
        
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Internal server error"
        })
    }
}


export async function DELETE(request: NextRequest, context: {params: Promise<{notesId: string}>}){

    const session = await getServerSession(auhtOptions);
    if(!session || !session.user){
        console.log("Unauthorized user!");
        return NextResponse.json({
            success: false,
            status: 403,
            message: "You must be logged in to delete the notes"
        })
    }
    

    await dbConnect();

    try{
        const {notesId} = await context.params;

        // Finding the note with the id
        const note = await notesModel.findById(notesId);
        if(!note){
            return NextResponse.json({
                success: false,
                status: 404,
                message: "No note found with this id"
            })
        }

        // Deleting from the cloudinary
        if(note.filePublicId){
            try{
                await cloudinary.uploader.destroy(note.filePublicId);
                console.log("Deleted from cloudinary");
            }
            catch(error){
                console.log("Error while deleting from cloud: ", error);
                return NextResponse.json({
                    success: false,
                    status: 403,
                    message: "Error while deleting from cloud"
                })
            }
        }

        // deleting all the comments related to this note
        if(note.comments && note.comments.length > 0){
            await commentsModel.deleteMany({_id: {$in: note.comments}})
        }

        // deleting the note itself
        const deleteResult = await notesModel.findByIdAndDelete(notesId);
        if(!deleteResult){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Deleting notes unsuccessful"
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Notes deleted successfully"
        })
    }

    catch(error: unknown){
        console.log("Something went wrong while deleting the notes");
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