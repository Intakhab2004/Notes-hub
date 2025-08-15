import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse"


export async function POST(request: NextRequest){
    try{
        console.log("Hellow");
        const {url} = await request.json();

        if(!url){
            console.log("Require file URL to extract the summary");
            return NextResponse.json({
                success: false,
                status: 404,
                message: "File URL not found"
            })
        }

        // Getting the file from cloudinary as arraybuffer.
        const response = await axios.get(url, {responseType: "arraybuffer"});
        // Converting the array buffer to nodejs buffer as pdf-parse require nodejs buffer format file type
        const nodeBuffer = Buffer.from(response.data);

        // Extracting the text data from pdf file
        const data = await pdf(nodeBuffer);
        const textData = data.text;


        const summaryRes = await axios.post(
            "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
            {inputs: textData},
            {headers: {Authorization: `Bearer ${process.env.HF_API_KEY}`}}
        )

        if(summaryRes.statusText !== "OK"){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "An error occured while API call"
            })
        }
        
        const summary = summaryRes.data[0].summary_text;
        return NextResponse.json({
            success: true,
            status: 200,
            message: "Summary got successfull",
            summary
        })
    }
    catch(error: unknown){
        console.log("Something went wrong while summarizing the text");
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