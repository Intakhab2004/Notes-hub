import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";
import { usernameSchema } from "@/schemas/signupSchema";
import { NextRequest, NextResponse } from "next/server";
import z, { success } from "zod";

const usernameQuerySchema = z.object({
    username: usernameSchema
})

export async function GET(request: NextRequest){
    await dbConnect();

    try{
        const {searchParams} = new URL(request.url);
        const queryParams = {username: searchParams.get("username")};
        
        //Zod validation
        const result = usernameQuerySchema.safeParse(queryParams);
        if(!result.success){
            return NextResponse.json({
                success: false,
                status: 402,
                message: "Please enter a valid username"
            })
        }

        const {username} = result.data;

        // Checking in the DB
        const existingVerifiedUser = await userModel.findOne({username, isVerified: true});
        if(existingVerifiedUser){
            console.log("Username already taken");
            return NextResponse.json({
                success: false,
                status: 403,
                message: "Username already taken"
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Username is available"
        })
    }
    catch(error: unknown){
        console.log("Something went wrong while validating the username");
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