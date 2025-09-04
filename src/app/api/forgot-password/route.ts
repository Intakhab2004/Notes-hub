import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mailConfig";
import { resetPasswordSchema } from "@/schemas/resetPassSchema";
import bcrypt from "bcryptjs";



export async function POST(request: NextRequest){
    await dbConnect();

    try{
        const { email } = await request.json();
        
        const existingUser = await userModel.findOne({email});
        if(!existingUser){
            console.log("User not exists with this email");
            return NextResponse.json({
                success: false,
                status: 404,
                message: "User not found with the given email"
            })
        }

        // Sending reset link through mail
        const mailResponse = await sendMail({email: email, randomUID: existingUser._id as string});
        if(!mailResponse.success){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Something went wrong while sending link"
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Reset password link has sent successfully"
        })
    }
    catch(error: unknown){
        console.log("Internal server error");
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
    await dbConnect();

    try{
        const reqBody = await request.json();
        const { newPassword, confirmNewPassword, id } = reqBody;

        // zod validation
        const validationresult = resetPasswordSchema.safeParse({newPassword, confirmNewPassword});
        if(!validationresult.success){
            console.log("Please fill all the details carefully");
            return NextResponse.json({
                success: false,
                status: 402,
                message: "Please enter valid details"
            })
        }

        const user = await userModel.findById(id);
        if(!user){
            return NextResponse.json({
                success: false,
                status: 404,
                message: "User not found"
            })
        }

        // hashing the newPassword
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // updating the password of user
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Password has changed successfully"
        })
    }
    catch(error: unknown){
        console.log("Internal server error");
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