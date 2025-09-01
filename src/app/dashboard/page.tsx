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
import { FaComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import Footer from "@/components/common/Footer";


export default function MyNotes(){
	const [loader, setLoader] = useState(true);
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
				{/* Main Content */}
				<div className="flex-1 min-h-full w-full px-3 py-6 md:p-10 bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#01012e] transition-all">
					<h1 className="text-3xl md:text-4xl font-extrabold text-center text-black/90 dark:text-white/90 pt-12 tracking-wide">
						Your Uploaded Notes
					</h1>

					{/* Notes container */}
					<div className="w-full max-w-5xl mt-10 md:ml-20 bg-gradient-to-tr from-[#DCCFC0] to-[#EEEEEE] dark:from-[#1f2101] dark:to-[#011d2e] rounded-2xl shadow-lg p-6 md:p-10 transition-all">
						{
							loader ? (
								<div className="flex gap-3 items-center justify-center text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200 py-20">
									Please wait <Loader2 className="w-7 h-7 animate-spin text-blue-500" />
								</div>
							)
							:
							notes.length <= 0 ? (
								<div className="w-full flex flex-col items-center py-20">
									<h2 className="text-xl font-semibold text-black/90 dark:text-white/90">
										You haven’t uploaded any notes yet
									</h2>
									<p className="font-medium text-gray-500 dark:text-gray-400 mt-2">
										Start sharing knowledge — Learn Together. Grow Together.
									</p>
								</div>
							)
							:
							(
								<div className="grid gap-6 md:grid-cols-2">
									{notes.map((note, index) => (
										<Link
											href={`/notes/${note._id}`}
											key={index}
											className="flex flex-col bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-xl 
												shadow-gray-400/20 dark:shadow-black/30 px-6 py-5 rounded-xl border border-transparent
												hover:border-blue-400 dark:hover:border-yellow-300 transform transition-all duration-300 hover:scale-105"
										>
											<h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
												{note.title}
											</h1>
											<div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
												<p>
													Subject: <span className="italic font-medium">{note.subject}</span>
												</p>
												<div className="flex gap-4">
													<div className="flex gap-1 items-center">
														<FcLike /> {note.likes.length}
													</div>
													<div className="flex gap-1 items-center">
														<FaComment className="text-blue-500 dark:text-yellow-400" /> {note.comments.length}
													</div>
												</div>
											</div>
											<DateFormat rawDate={note.createdAt} />
										</Link>
									))}
								</div>
							)
						}
					</div>
				</div>
			</div>
			<Footer />
		</section>
	)
}
