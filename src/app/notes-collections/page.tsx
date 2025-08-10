"use client"

import Navbar from "@/components/common/Navbar"
import Sidebar from "@/components/common/Sidebar"
import Image from "next/image"
import img1 from "@/assets/img1.webp"
import { useEffect, useState } from "react"
import { Notes } from "@/models/Notes"
import { Loader2 } from "lucide-react"
import NoteCard from "@/components/common/NoteCard"
import { toast } from "sonner"
import axios from "axios"
import Footer from "@/components/common/Footer"


export default function NotesCollections(){
    const [loader, setLoader] = useState(false);
    const [notes, setNotes] = useState<Notes[]>([]);

    useEffect(() => {
        const getAllNotes = async() => {
            try{
                setLoader(true);
                
                const result = await axios.get("/api/upload-notes");

                if(!result.data.success){
                    console.log("Something went wrong while fetching the notes: ", result.data.message);
					const toastId = toast(
						"Something went wrong while fetching the notes",
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
                    setNotes(result.data.notesResult);
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

        getAllNotes();

    }, [])


    return (
        <section>
            <Navbar />
            <div className="min-h-screen flex flex-1 pt-17 overflow-y-auto">
                <Sidebar />

                {/* Main Container */}
                <div className="min-h-full w-full flex flex-col items-center p-2 bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#030335] transition-all">
                    <div className="w-11/12 md:w-10/12 flex gap-6 md:gap-10 flex-wrap mt-10 md:mt-20">
                        <div className="w-full md:w-1/2">
                            <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold pt-10">
                                Get all your Notes Here
                            </h1>
                            <p className="text-base font-medium text-gray-400 mt-7">
                                At NotesHub, you'll find notes for every subject, every topic, and every level.
                                From engineering and science to arts and literature, we've got you covered.
                                Whether it's detailed study material, quick revision guides, or project references, it's all here.
                                No matter what you're learning, NotesHub has the perfect notes for you.
                            </p>
                        </div>

                        <Image
                            src={img1}
                            alt="notesImage"
                            className="h-[20rem] w-full md:w-[30rem] rounded-md"
                        />
                        
                    </div>

                    <div className="w-11/12 h-[1px] mt-8 bg-gray-400"></div>

                    {/* Notes Container */}
                    <div className="w-full md:w-10/12 flex gap-6 md:gap-10 flex-wrap my-20">
                        {/* TODO: Search bar
                        <div className="w-full h-6 border-b-1 border-gray-400">

                        </div> */}

                        <div>
                            {
                                loader ? (
                                    <div className="flex gap-3 items-center text-xl font-semibold">
										Please wait <Loader2 className="w-8 h-8 animate-spin" />
									</div>
                                )
                                :
                                notes.length <= 0 ? (
                                    <div className="w-full flex flex-col items-center ">
										<h2 className="text-xl font-semibold text-black/90 dark:text-white/90">
											No notes to be displayed
										</h2>
										<p className="font-semibold text-black/60 dark:text-white/60">
											Sorry for your Inconvenience
										</p>
									</div>
                                )
                                :
                                <div className="flex justify-center flex-wrap gap-2 md:gap-6">
                                    {
                                        notes.map((note) => (
                                            <NoteCard
                                                key={note._id as string}
                                                note={note}
                                            />
                                        ))
                                    }
                                </div>

                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}