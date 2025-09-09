import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react";


export default function SummaryBox({fileUrl}: {fileUrl: string}){
    const [loader, setLoader] = useState(false);
    const [summary, setSummary] = useState("");
    const [lastFileUrl, setLastFileUrl] = useState("");


    const clickHandler = async() => {
        if(summary && fileUrl === lastFileUrl){
            console.log("Using cached summary");
            return ;
        }

        setLoader(true);
        try{
            const result = await axios.post("/api/ai-summarizer", {url: fileUrl});
            if(!result.data.success){
                console.log("Something went wrong: ", result.data.message);
                const toastId = toast(
					"Something went wrong",
					{
						description: result.data.message,
						action: {
							label: "Dismiss",
							onClick: () => {
								toast.dismiss(toastId);
							}
						}
					}
				)
            }
            else{
                setSummary(result.data.summary);
                setLastFileUrl(fileUrl);
            }
        }
        catch(error){
            if(error instanceof Error){
                console.log("Something went wrong: ", error.message);
            }
            else{
                console.log("An unknown error: ", error);
            }
            
            const toastId = toast(
                "Something went wrong",
                {
                    description: "Please try again",
                    action: {
                        label: "Dismiss",
                        onClick: () => {
                            toast.dismiss(toastId);
                        }
                    }
                }
            )
        }
        finally{
            setLoader(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    onClick={clickHandler}
                     className="px-5 py-3 bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 
                        text-white font-semibold rounded-xl shadow-md transition-all duration-300"
                >
                    Summarize the PDF
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    {
                        <DialogTitle className={`${loader ? "hidden" : "flex"}`}>
                            Summary of the PDF
                        </DialogTitle>
                    }
                    {
                        loader ? (
                            <div className="flex flex-col items-center">
                                Please hold tight while your PDF is processing...
                                <Loader2 className="mr-2 h-7 w-7 animate-spin"/>
                            </div>
                        )
                        :
                        (
                            <DialogDescription>
                                {
                                    summary ? summary : "File is too large to summarize"
                                }
                            </DialogDescription>
                        )
                    }
                </DialogHeader>
                <DialogFooter>
                    {
                        !loader && (
                            <DialogClose asChild>
                                <Button variant="outline">Close</Button>
                            </DialogClose>
                        )
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}