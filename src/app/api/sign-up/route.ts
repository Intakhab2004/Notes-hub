import dbConnect from "@/lib/dbConnect";
import { sendMail } from "@/lib/mailConfig";
import userModel from "@/models/User";
import { signupSchema } from "@/schemas/signupSchema";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    await dbConnect();

    try{
        const reqBody = await request.json();
        const {username, email, password, confirmPassword} = reqBody;

        // Zod validation for signup schema
        const signupQuerySchema = {  
        username,
            email,
            password,                        // This object for schema validation and zod requires an object in safeParse.
            confirmPassword
        }

        const result = signupSchema.safeParse(signupQuerySchema);
        if(!result.success){
            console.log("Please fill all the details carefully");
            return NextResponse.json({
                success: false,
                status: 402,
                message: "Please enter valid details"
            })
        }

        // Checking password and confirmPassword is same or not
        if(password !== confirmPassword){
            console.log("The two passwords are not same");
            return NextResponse.json({
                success: false,
                status: 403,
                message: "Password and Confirm password are not same"
            })
        }

        //generating 6-digits OTP, OTP expiry setting, hashing password
        const otpCode = Math.floor(Math.random() * 900000 + 100000).toString();
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Checking user by email
        const existingUserByEmail = await userModel.findOne({email});
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                //User exists in DB and also he is verified user. Simply return false
                return NextResponse.json({
                    success: false,
                    status: 401,
                    message: "User already exists with the given email"
                })
            }
            else{
                //User exists in DB but is not verified. Just updates the entry in DB
                existingUserByEmail.username = username;
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.otp = otpCode;
                existingUserByEmail.otpExpiry = expiryDate;

                await existingUserByEmail.save();
            }
        }

        // Checking user by username
        const existingUserByUsername = await userModel.findOne({username});
        if(existingUserByUsername){
            if(existingUserByUsername.isVerified){
                //User exists in DB and also he is verified user. Simply return false
                return NextResponse.json({
                    success: false,
                    status: 401,
                    message: "User already exists with the entered username"
                })
            }
            else{
                //User exists in DB but is not verified. Just updates the entry in DB
                existingUserByUsername.email = email;
                existingUserByUsername.password = hashedPassword;
                existingUserByUsername.otp = otpCode;
                existingUserByUsername.otpExpiry = expiryDate;

                await existingUserByUsername.save();
            }
        }

        else{
            const newUser = new userModel({
                username,
                email,
                password: hashedPassword,
                isVerified: false,
                otp: otpCode,
                otpExpiry: expiryDate
            })

            await newUser.save();
        }

        // Sending otp through mail
        const mailResponse = await sendMail({email: email, username: username, otp: otpCode});
        if(!mailResponse.success){
            return NextResponse.json({
                success: false,
                status: 401,
                message: mailResponse.message
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Account created successfully. Please check your email for verification"
        })
    }
    catch(error: unknown){
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