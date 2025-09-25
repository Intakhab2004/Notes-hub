"use client"

import Navbar from "@/components/common/Navbar"
import Sidebar from "@/components/common/Sidebar"
import Image from "next/image"
import img1 from "@/assets/img1.webp"
import { useEffect, useState } from "react"
import { Notes } from "@/models/Notes"
import { ChevronLeftIcon, ChevronRight, Loader2 } from "lucide-react"
import NoteCard from "@/components/common/NoteCard"
import { toast } from "sonner"
import axios from "axios"
import Footer from "@/components/common/Footer"
import { useForm } from "react-hook-form"
import { useDebounceCallback } from "usehooks-ts"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getPaginationArray } from "@/helpers/pagination"
import { useSearchParams, useRouter } from "next/navigation"




export default function NotesCollections() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const initialPage = parseInt(searchParams.get("page") || "1", 10);
	const [pageNumber, setPageNumber] = useState(initialPage);

	const [loader, setLoader] = useState(false);
	const [notes, setNotes] = useState<Notes[]>([]);
	const [filteredNotes, setFilteredNotes] = useState<Notes[]>([]);
	const [totalPage, setTotalPage] = useState(1);
	const [searchInput, setSearchInput] = useState("");

	const debounced = useDebounceCallback(setSearchInput, 500);

	const form = useForm({
		defaultValues: {
			searchInput: ""
		}
	});

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				setLoader(true);
				const result = await axios.get(`/api/upload-notes?page=${pageNumber}`);

				if(!result.data.success){
					toast.error("Something went wrong while fetching the notes");
				} 
                else {
					setNotes(result.data.notesResult);
					setTotalPage(result.data.totalPages);
				}
			} 
            catch(error: unknown){
				toast.error("Internal server error. Please try again.");
			} 
            finally{
				setLoader(false);
			}
		};

		fetchNotes();
	}, [pageNumber]);


	useEffect(() => {
		if (!searchInput.trim()) {
			setFilteredNotes(notes);
			return;
		}

		const lower = searchInput.toLowerCase();
		const result = notes.filter((note) =>
			note.title.toLowerCase().includes(lower) ||
			note.subject.toLowerCase().includes(lower) ||
			note.tags.some((tag) => tag.toLowerCase().includes(lower))
		)

		setFilteredNotes(result);
	}, [searchInput, notes]);

	const handlePageChange = (p: number) => {
		setPageNumber(p);
		router.push(`/notes-collections?page=${p}`, { scroll: false });
	}



	return (
		<section className="bg-[#FAF9EE] dark:bg-[#0f0f1a] transition-colors duration-500">
			<Navbar />
			<div className="min-h-screen flex pt-16">
				<Sidebar />

				{/* Main Content */}
				<div className="flex-1 min-h-full w-full px-3 py-6 md:p-10 bg-gradient-to-r from-[#ded7bd70] to-[#d1d1cd2b] dark:from-[#001f3f] dark:to-[#001f3fa5] rounded-tl-3xl transition-all">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-12 md:mt-16">
						<div>
							<h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-snug">
								Get all your Notes Here
							</h1>
							<p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 mt-6 leading-relaxed">
								At <span className="font-bold text-green-600 dark:text-green-400">NotesHub</span>, you will find notes
								for every subject, topic, and level. From engineering and science to arts and literature, we have got you covered. 
								Whether it’s detailed study material, quick revision guides, or project references, it’s all here.
							</p>
						</div>

						<Image
							src={img1}
							alt="NotesHub Illustration"
							className="h-[18rem] md:h-[22rem] w-full rounded-2xl shadow-lg object-cover"
						/>
					</div>

					<div className="flex justify-end mt-12">
						<Form {...form}>
							<form>
								<FormField
									control={form.control}
									name="searchInput"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder="Search title, subject, tags..."
													{...field}
													onChange={(e) => {
														field.onChange(e);
														debounced(e.target.value);
													}}
													className="w-full md:w-80 rounded-xl px-4 py-3 text-base border-gray-300 shadow-sm
													    dark:border-gray-600 dark:bg-[#1a1a2a] dark:text-white"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</form>
						</Form>
					</div>

					<div className="mt-14">
						{
                            loader ? (
                                <div className="flex justify-center gap-3 items-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Loading Notes <Loader2 className="w-7 h-7 animate-spin" />
                                </div>
						    ) 
                            : notes.length <= 0 ? (
							    <div className="w-full flex flex-col items-center mt-20">
                                    <h2 className="text-xl font-semibold text-black/90 dark:text-white/90">
                                        No notes available
                                    </h2>
                                    <p className="font-medium text-black/60 dark:text-white/60">
                                        Sorry for the inconvenience
                                    </p>
                                </div>
						    ) 
                            : 
                            (
                                <div className="flex flex-wrap justify-start items-stretch gap-4">
                                    {filteredNotes.map((note) => (
                                        <NoteCard key={note._id as string} note={note} />
                                    ))}
                                </div>
						    )
                        }
					</div>
					
					{/* Pagination */}
					{
						!loader && (
							<div className="flex items-center justify-center gap-2 mt-10">
								<button 
									disabled={pageNumber === 1} 
									onClick={() => handlePageChange(pageNumber-1)}
									className="px-1 py-1 cursor-pointer"
								>
									<ChevronLeftIcon />
								</button>
								<div className="flex gap-2">
									<div className="flex gap-2">
										{
											getPaginationArray(pageNumber, totalPage).map((p, idx) =>
												typeof p === "number" ? (
													<button
														key={idx}
														onClick={() => handlePageChange(p)}
														className={`px-3 py-1 rounded cursor-pointer ${pageNumber === p ? "bg-blue-600 text-white scale-90" : "bg-[#cad4efa4] dark:bg-[#34353aa4]"}`}
													>
														{p}
													</button>
												) 
												: 
												(
													<span key={idx} className="px-2">...</span>
												)
											)
										}
									</div>
								</div>
								<button
									disabled={pageNumber === totalPage}
									onClick={() => handlePageChange(pageNumber+1)}
									className="px-1 py-1 cursor-pointer"
								>
									<ChevronRight />
								</button>
							</div>
						)
					}

				</div>
			</div>

			<Footer />
		</section>
	)
}