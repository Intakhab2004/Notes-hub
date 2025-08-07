"use client"

import DateFormat from "@/components/common/DateFormat";
import Navbar from "@/components/common/Navbar"
import Sidebar from "@/components/common/Sidebar"
import { Notes } from "@/models/Notes";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function MyNotes(){
	const [loader, setLoader] = useState(false);
	const [notes, setNotes] = useState<Notes[]>([]);


	useEffect(() => {
		const getNotes = async() => {
			setLoader(true);

			try{
				const result = await axios.get("/api/user-notes");
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
					console.log("Notes Fetched successfully");
					setNotes(result.data.response);
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

		getNotes();

	}, [])


	return (
		<section>
			<Navbar/>
			<div className="min-h-screen flex flex-1 pt-17 overflow-y-auto">
				<Sidebar/>

				{/* main container */}
				<div className="min-h-full w-full flex flex-col items-center p-2 md:pr-25 bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#01012e] transition-all">
					<h1 className="text-2xl md:text-3xl lg:text-3xl font-bold pt-10 md:pr-15">
						Your Uploaded Notes
					</h1>

					{/* Notes container */}
					<div className="w-full max-w-4xl p-5 md:p-8 my-10 space-y-8 bg-white rounded-lg shadow-md dark:bg-[#1b1b31] dark:shadow-gray-500">
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
																	You have not upload any notes yet
																</h2>
																<p className="font-semibold text-black/60 dark:text-white/60">
																	Learn Together. Grow Together.
																</p>
															</div>
														)
														:
														(
															<div className="flex flex-col gap-6">
																{
																	notes.map((note, index) => (
																		<Link
																			href={`/notes/${note._id}`}
																			key={index}
																			className="flex flex-col bg-gray-200 dark:bg-gray-800 shadow-lg shadow-gray-400 
																				dark:shadow-white/10 px-7 py-4 rounded-md border-none hover:shadow-none hover:scale-105 hover:border-1 
																				hover:border-black/70 dark:hover:border-white/60 transition-all duration-300"
																		>
																			<h1 className="text-xl font-bold">
																				{note.title}
																			</h1>
																			<div className="flex justify-between">
																				<p>
																					Subject: <span className="font-light italic">{note.subject}</span>
																				</p>
																				<div className="flex gap-4">
																					<p>
																						❤ {note.likes}
																					</p>
																					<p>
																						💬 {note.comments.length}
																					</p>
																				</div>
																			</div>
																			<DateFormat rawDate={note.createdAt} />
																		</Link>
																	))
																}
															</div>
														)
									
						}
					</div>
				</div>
			</div>
		</section>
	)
}
