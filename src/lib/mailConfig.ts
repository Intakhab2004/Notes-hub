import { apiResponse } from "@/types/apiResponse";
import nodemailer from "nodemailer"
import { otpTemplate } from "@/emails/otpVerification";

interface mailParams{
    email: string,
    username: string,
    otp: string
}

export async function sendMail({email, username, otp}: mailParams): Promise<apiResponse> {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        const mailOptions = {
            from: `NotesHub ${process.env.MAIL_USER}`,
            to: email,
            subject: "NotesHub | Verification Code",
            html: otpTemplate(otp, username)
        }

        const response = await transporter.sendMail(mailOptions);

        if(response.accepted.length > 0){
            return {
                success: true,
                status: 200,
                message: "OTP sent successfully"
            }
        }

        return {
            success: false,
            status: 403, 
            message: "Something went wrong while sending mail"
        }
    }
    catch(error: unknown){
        console.log("Failed to send email");
        if(error instanceof Error){
            console.log("An error occured: ", error.message);
        }
        else{
            console.log("An unknown error: ", error);
        }

        return {
            success: false,
            status: 500,
            message: "Internal server error"
        }

    }
}