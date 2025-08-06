"use client"

import Navbar from "@/components/common/Navbar"
import PdfViewer from "@/components/common/PdfViewer";
import Sidebar from "@/components/common/Sidebar"
import { Notes } from "@/models/Notes";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";


export default function NotesPage(){
    const [loader, setLoader] = useState(true);
    const [noteDetails, setNoteDetails] = useState<Notes | null>(null);
    const params = useParams();

    const noteId = params?.notesId;


    useEffect(() => {
        const getNotesDetails = async() => {
            try{
                setLoader(true);
                const result = await axios.get(`/api/upload-notes/${noteId}`);

                if(!result.data.success){
                    console.log("Something went wrong while fetching the data: ", result.data.message);
					const toastId = toast(
						"Something went wrong while fetching the data",
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
                    console.log("Notes fetched successfully: ", result.data.message);
                    setNoteDetails(result.data.noteDetails);
                }
            }
            catch(error){
                console.log("Something went wrong: ", error);
				
				const toastId = toast(
					"Internal server error",
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

        getNotesDetails();

    }, [])




    return (
        <section>
            <Navbar/>
            <div className="min-h-screen flex flex-1 pt-17 overflow-y-auto">
                <Sidebar/>

                {/* Main Container */}
                <div className="min-h-full w-full flex flex-col items-center p-2 bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#01012e] transition-all">
                   { 
                        loader ? (
                            <div className="flex gap-3 mt-40 items-center justify-center text-xl font-semibold">
                                Please wait while your content is loading <Loader2 className="w-8 h-8 animate-spin" />
                            </div>
                        ) 
                        : 
                        (
                            !noteDetails ? (
                                <div className="w-full flex flex-col items-center ">
									<h2 className="text-xl font-semibold text-black/90 dark:text-white/90">
										Note not found
									</h2>
									<p className="font-semibold text-black/60 dark:text-white/60">
										The note you are looking for not found
									</p>
								</div>
                            )
                            :
                            (
                                <div className="w-full flex justify-center">
                                    <PdfViewer fileUrl={noteDetails.fileURL} />
                                </div>
                            )
                        )
                   }
                </div>
            </div>
        </section>
    )
}