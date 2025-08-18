import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auhtOptions } from "../auth/[...nextauth]/options";
import userModel from "@/models/User";
import { profileSchema } from "@/schemas/profileSchema";
import profileModel from "@/models/Profile";


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
            dateOfBirth, 
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
                errors: validationResult.error.flatten().fieldErrors,
            })
        }

        const updatedProfile = await profileModel.findByIdAndUpdate(
            currentUser.userDetails,
            {$set: validationResult.data},
            {new: true}
        )

        if(!updatedProfile){
            console.log("An error occured while updating the profile");
            return NextResponse.json({
                success: false,
                status: 403,
                message: "Something went wrong while updating the user"
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Profile updated successfully"
        })

    }
    catch(error){
        console.log("Something went wrong while sign in");
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