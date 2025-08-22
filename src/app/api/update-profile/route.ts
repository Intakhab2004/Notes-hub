import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auhtOptions } from "../auth/[...nextauth]/options";
import userModel from "@/models/User";
import { profileSchema } from "@/schemas/profileSchema";
import profileModel from "@/models/Profile";
import cloudinary from "@/lib/cloudinaryConfig";


export async function POST(request: NextRequest){
    const session = await getServerSession(auhtOptions);
    if(!session || !session.user){
        console.log("User not logged in");
        return NextResponse.json({
            success: false,
            status: 402,
            message: "User not logged in"
        })
    }
    
    await dbConnect();

    try{
        const currentUser = await userModel.findOne({_id: session.user._id});
        if(!currentUser){
            return NextResponse.json({
                success: false,
                status: 404,
                message: "User not found"
            })
        }

        const reqBody = await request.json();
        const {firstName, lastName, gender, dateOfBirth, about, contactNumber} = reqBody;

        // This object is only for zod validation
        const userDetailsObject = {
            firstName, 
            lastName, 
            gender, 
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            about, 
            contactNumber
        }

        const validationResult = profileSchema.safeParse(userDetailsObject);
        if(!validationResult.success){
            console.log("Please fill all the details carefully");
            return NextResponse.json({
                success: false,
                status: 402,
                message: "Schema validation failed",
                errors: validationResult.error.issues[0].message
            })
        }

        const profile = await profileModel.findOne({_id: currentUser.userDetails});
        if(!profile){
            return NextResponse.json({
                success: false,
                status: 404,
                message: "Profile not found"
            })
        }

        if (firstName) profile.firstName = firstName;
        if (lastName) profile.lastName = lastName;
        if (gender) profile.gender = gender;
        if (dateOfBirth) profile.dateOfBirth = dateOfBirth;
        if (about) profile.about = about;
        if (contactNumber) profile.contactNumber = contactNumber;

        await profile.save();
        

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Profile updated successfully"
        })

    }
    catch(error){
        console.log("Something went wrong");
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


export async function PUT(request: NextRequest){
    const session = await getServerSession(auhtOptions);
    if(!session || !session.user){
        console.log("User not logged in");
        return NextResponse.json({
            success: false,
            status: 402,
            message: "User not logged in"
        })
    }

    await dbConnect();

    try{
        const formData = await request.formData();
        const file = formData.get("image") as File | null;
        if(!file){
            return NextResponse.json({
                success: false,
                status: 402,
                message: "File not found"
            })
        }

        if(file && !["image/jpeg", "image/png", "image/jpg", "image/webp", "image/svg"].includes(file.type)){
            console.log("Unsupported file type");
            return NextResponse.json({
                success: false,
                status: 401,
                message: "File not supported. Please upload mentioned file type"
            })
        }

        
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
        
        const updatedUser = await userModel.findByIdAndUpdate(
            session.user._id,
            {image: uploadResult.secure_url},
            {new: true}
        )

        if(!updatedUser){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Something went wrong while updating the profile picture"
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Profile picture updated successfully"
        })
    }
    catch(error: unknown){
        console.log("Something went wrong");
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