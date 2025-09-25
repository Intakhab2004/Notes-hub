import dbConnect from "@/lib/dbConnect";
import notesModel from "@/models/Notes";
import { uploadNotesSchema } from "@/schemas/uploadNotesSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auhtOptions } from "../auth/[...nextauth]/options";
import cloudinary from "@/lib/cloudinaryConfig";
import mongoose from "mongoose";


export async function POST(request: NextRequest){
    await dbConnect();

    const session = await getServerSession(auhtOptions);
    if(!session || !session.user){
        console.log("Unauthorized user");
        return NextResponse.json({
            success: false,
            status: 403,
            message: "You must be logged in to upload notes"
        })
    }

    try{
        const formData = await request.formData();  // When there is input with file type in the form in frontend then we have to parse the input data from formData.

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const tags = JSON.parse(formData.get("tags") as string);
        const subject = formData.get("subject") as string;

        const file = formData.get("file") as File | null;

        //Zod implementation
        const notesQuerySchema = {title, description, tags, subject};
        const result = uploadNotesSchema.safeParse(notesQuerySchema);

        if(!result.success){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Please fill all the details carefully"
            })
        }

        // Checking if file is present or not
        if(!file){
            return NextResponse.json({
                success: false,
                status: 404,
                message: "File is missing"
            })
        }

        // Checking supported file type
        if(file && !["image/jpeg", "image/png", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)){
            console.log("Unsupported file type");
            return NextResponse.json({
                success: false,
                status: 401,
                message: "File not supported. Please upload mentioned file type"
            })
        }

        // Uploading file to cloudinary
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uploadResult = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: process.env.FOLDER_NAME,
                    resource_type: "auto"
                },
                (error, result) => {
                    if(error) return reject(error);
                    else resolve(result);
                }
            )
            uploadStream.end(buffer);
        })

        const newNotes = new notesModel({
            title,
            description,
            fileURL: uploadResult.secure_url,
            filePublicId: uploadResult.public_id,
            tags,
            subject,
            uploadedBy: new mongoose.Types.ObjectId(session.user._id)
        })

        await newNotes.save();

        return NextResponse.json({
            success: true,
            status: 200,
            message: "File uploaded successfully"
        })
    }

    catch(error: unknown){
        console.log("Something went wrong while uploading the file");
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


// Fetching all notes
export async function GET(req: NextRequest){
    await dbConnect();

    try{
        const { searchParams } = req.nextUrl;
        const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

        // Total notes count
        const totalNotes = await notesModel.countDocuments();

        const notesResult = await notesModel.find()
                                                   .skip((page - 1)*12)
                                                   .limit(12)
                                                   .sort({createdAt: -1})
                                                   .populate({
                                                        path: "uploadedBy",
                                                        select: "username"
                                                   })
        if(!notesResult){
            return NextResponse.json({
                success: false,
                status: 402,
                message: "Something went wrong while fetching the contents"
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Notes fetched successfully",
            notesResult,
            totalPages: Math.ceil(totalNotes/12),
        })
    }

    catch(error: unknown){
        console.log("Something went wrong while fetching the contents");
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
