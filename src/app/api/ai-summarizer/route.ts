import { chunkTextData } from "@/helpers/chunkTextData";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse"


export async function POST(request: NextRequest){
    try{
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

        // Getting the chuncked textData
        const chunks = chunkTextData(textData);

        // Running all the AI api call parallely using Promise.all
        const summaryPromises = chunks.map(chunk => 
            axios.post(
                "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
                {inputs: chunk},
                {
                    headers: {
                        Authorization: `Bearer ${process.env.HF_API_KEY}`,
                        "Content-Type": "application/json"
                    }
                }
            )
        )
        const responses = await Promise.all(summaryPromises);

        // extracting summaries of all chunks
        const chunkSummaries = responses.map(res => res.data[0].summary_text).filter(Boolean);

        // Merging all the chunckSummaries
        const combinedSummary = chunkSummaries.join(" ");
        
        // One more API call for final summary
        const finalRes = await axios.post(
            "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
            { inputs: combinedSummary },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        )
        
        if(finalRes.statusText !== "OK"){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "An error occured while API call"
            })
        }
        const summary = finalRes.data[0]?.summary_text;

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