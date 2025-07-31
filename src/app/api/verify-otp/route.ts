import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";
import { verifySchema } from "@/schemas/verifySchema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    await dbConnect();

    try{
        const reqBody = await request.json();
        const {username, otp} = reqBody;

        //Zod validation for OTP
        const result = verifySchema.safeParse({otp});
        console.log("Result of zod validation: ", result);

        if(!result.success){
            console.log("Zod validation failed!");
            return NextResponse.json({
                success: false,
                status: 401,
                message: "OTP must be of 6-digits"
            })
        }

        // Finding user with the username
        const user = await userModel.findOne({username});
        if(!user){
            console.log("User do not exists");
            return NextResponse.json({
                success: false,
                status: 404,
                message: "User do not exists"
            })
        }

        if(user.isVerified){
            return NextResponse.json({
                success: false,
                status: 402,
                message: "Account is already verified"
            })
        }

        const isValidOtp = (user.otp === otp);
        const otpNotExpired = new Date(user.otpExpiry) > new Date();

        if(isValidOtp && otpNotExpired){
            user.isVerified = true;
            await user.save();

            return NextResponse.json({
                success: true,
                status: 200,
                message: "Account verified successfully"
            })
        }

        else if(!otpNotExpired){
            console.log("OTP expired!!")
            return NextResponse.json({
                success: false,
                status: 401,
                message: "OTP expired, Please Signup again to get a new OTP"
            })
        }

        else{
            console.log("Invalid OTP");
            return NextResponse.json({
                success: false,
                status: 403,
                message: "Invalid OTP"
            })
        }
    }
    catch(error: unknown){
        console.log("Something went wrong while verifying the otp");
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