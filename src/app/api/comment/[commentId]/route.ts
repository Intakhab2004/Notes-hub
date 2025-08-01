import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auhtOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import commentsModel from "@/models/Comments";
import notesModel from "@/models/Notes";


//Deleting comment
export async function DELETE(request: NextRequest, {params}: {params: {commentId: string}}){
    const session = await getServerSession(auhtOptions);
    if(!session || !session.user){
        return NextResponse.json({
            success: false,
            status: 401,
            message: "You must be logged in to delete the comment"
        })
    }

    await dbConnect();

    try{
        const id = params.commentId;
        const {notesId} = await request.json();

        //Finding the comment to delete
        const comment = await commentsModel.findOne({_id: id});
        if(!comment){
            console.log("Comment does not exists with this id");
            return NextResponse.json({
                success: false,
                status: 402,
                message: "Comment does not exists"
            })
        }

        //Checking for if the user is authorized to delete the comment
        if(comment.userId.toString() !== session.user._id){
            console.log("You are not authorized to delete this comment");
            return NextResponse.json({
                success: false,
                status: 403,
                message: "You can only delete your own comment"
            })
        }

        //Deleting comment from notes model
        const updatedNotes = await notesModel.findByIdAndUpdate(
            notesId,
            {$pull: {comments: id}},
            {new: true}
        );
        if(!updatedNotes){
            return NextResponse.json({
                success: false,
                status: 402,
                message: "Issue while deleting comment from note"
            })
        }

        //Deleting comment form DB
        const deletedComment = await commentsModel.findByIdAndDelete(id);
        if(!deletedComment){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Issue while deleting comment"
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Comment deleted successfully"
        })
    }

    catch(error: unknown){
        console.log("Something went wrong while deleting comment");
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



//Updating the comment
export async function PUT(request: NextRequest, {params}: {params: {commentId: string}}){
    const session = await getServerSession(auhtOptions);
    if(!session || !session.user){
        return NextResponse.json({
            success: false,
            status: 401,
            message: "You must be logged in to edit the comment"
        })
    }

    await dbConnect();
    try{
        const id = params.commentId;
        const {newComment} = await request.json();

        //Finding the comment to edit
        const comment = await commentsModel.findOne({_id: id});
        if(!comment){
            console.log("Comment does not exists with this id");
            return NextResponse.json({
                success: false,
                status: 402,
                message: "Comment does not exists"
            })
        }

        //Checking if the user is authorized to edit the comment
        if(comment.userId.toString() !== session.user._id){
            console.log("You are not authorized to edit this comment");
            return NextResponse.json({
                success: false,
                status: 403,
                message: "You can only edit your own comment"
            })
        }

        //Editing the comment models
        const updatedComment = await commentsModel.findByIdAndUpdate(
            id,
            {$set: {content: newComment}},
            {new: true}
        )

        if(!updatedComment){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Issue while editing the comment"
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "You have edited your comment"
        })

    }
    
    catch(error: unknown){
        console.log("Something went wrong while editing the comment");
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