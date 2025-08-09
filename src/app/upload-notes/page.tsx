'use client'
import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import Sidebar from '@/components/common/Sidebar'
import TagsInput from '@/components/common/TagsInput'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { uploadNotesSchema } from '@/schemas/uploadNotesSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { CloudUpload, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const UploadNotes = () => {
	const [fileName, setFileName] = useState("");
	const [previewURL, setPreviewURL] = useState<string | null>(null);
	const [loader, setLoader] = useState(false);
    
	const form = useForm<z.infer<typeof uploadNotesSchema>>({
		resolver: zodResolver(uploadNotesSchema),
		defaultValues: {
			title: "",
			description: "",
			tags: [],
			subject: "",
			file: null
		}
	})


	const submitHandler = async(data: z.infer<typeof uploadNotesSchema>) => {
		try{
			if(!data.file){
				console.log("Please upload one file");
				const toastId = toast(
					"Please upload a file",
					{
						description: "Try again",
						action: {
							label: "Dismiss",
							onClick: () => {
								toast.dismiss(toastId);
							}
						}
					}
				)
				return ;
			}

			setLoader(true);

			const formData = new FormData();
			const file = data.file[0]; // Fteching file from the form

			formData.append("file", file);
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("subject", data.subject);
			formData.append("tags", JSON.stringify(data.tags));

			const result = await axios.post("/api/upload-notes", formData);

			if(!result.data.success){
				console.log("Something went wrong while sending the data: ", result.data.message);
				const toastId = toast(
					"Something went wrong while sending the data",
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
				const toastId = toast(
					"Success",
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

		}
		catch(error: unknown){
			if(error instanceof Error){
                console.log("Something went wrong: ", error.message);
            }
            else{
                console.log("An unknown error: ", error);
            }
            
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

  	return (
		<section>
			<Navbar/>
			<div className="min-h-screen flex flex-1 pt-17 overflow-y-auto">
				<Sidebar/>

				{/* Main container */}
				<div className="min-h-full w-full flex flex-col items-center p-2 md:pr-35 bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#01012e] transition-all">
					<h1 className="text-2xl md:text-3xl lg:text-3xl font-bold pt-12">
						Upload your Notes here
					</h1>

					{/* Notes upload form */}
					<div className="w-full max-w-2xl p-5 md:p-8 my-12 mb-30 space-y-8 bg-white rounded-lg shadow-md dark:bg-[#1b1b31] dark:shadow-gray-500">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
								<FormField
									control={form.control}
									name="title"
									render={({field}) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
												<FormControl>
													<Input placeholder="Title of notes"
														{...field} 
													/>
												</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="description"
									render={({field}) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea placeholder="Write about notes" rows={4}
														{...field} 
													/>
												</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="tags"
									render={({field}) => (
										<FormItem>
											<FormLabel>Tags</FormLabel>
												<FormControl>
													<TagsInput value={field.value} onChange={field.onChange}/>
												</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="subject"
									render={({field}) => (
										<FormItem>
											<FormLabel>Subject</FormLabel>
												<FormControl>
													<Input placeholder="Subject"
														{...field} 
													/>
												</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="file"
									render={({ field: { onChange, ref } }) => (
										<FormItem>
										<FormLabel>Upload File</FormLabel>
										<FormControl>
											<div>
												<input
													type="file"
													accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
													onChange={(e) => {
														const file = e.target.files?.[0];
														if(file){
															onChange(e.target.files); // update form state
															setFileName(file.name);
															const previewUrl = URL.createObjectURL(file);
															setPreviewURL(previewUrl);
														}
													}}
													ref={ref}
													className="hidden"
													id="file-upload"
												/>

												{/* Custom clickable upload area */}
												<label
													htmlFor="file-upload"
													className="h-80 w-full md:w-1/2 border border-gray-700 dark:border-white rounded-md flex 
														items-center justify-center bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-100 
														transition-all duration-200 overflow-hidden"
												>
													{
														previewURL ? 
														(
															fileName.match(/\.(jpg|jpeg|png|webp)$/i) ? 
																	(
																		<img
																			src={previewURL}
																			alt="Preview"
																			className="object-contain h-full w-full"
																		/>
																	) : fileName.endsWith(".pdf") ? 
																	(
																		<iframe
																			src={previewURL}
																			className="w-full h-full border-none"
																		/>
																	) : 
																	(
																		<p className="text-sm text-yellow-500">
																			Preview not supported for this file type.
																		</p>
																	)
														) 
														: 
														(
															<div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-t from-black/10
																 to-blue-100 dark:bg-gradient-to-t dark:from-black/60 dark:to-blue-950"
															>
																<p className="text-lg font-bold ">Choose a file</p>
																<CloudUpload size={50} className="text-blue-600 dark:text-yellow-300"/>
																<p className="font-semibold">
																	Supported file types are
																</p>
																<p className="text-[0.6rem] font-bold">
																	.pdf | .doc | .docx | .jpg | .jpeg | .png | .webp
																</p>
															</div>
														)
													}
												</label>
											</div>
										</FormControl>

										{
											fileName && (
												<div className="mt-3 flex flex-col md:flex-row md:items-center md:gap-4">
													<p className="text-sm text-muted-foreground mt-2">
														Selected file: <strong>{fileName}</strong>
													</p>

													<button
														type="button"
														onClick={() => document.getElementById("file-upload")?.click()}
														className="mt-2 md:mt-0 px-4 py-2 text-sm font-medium text-black/90 border-1 border-black/80 bg-gradient-to-r from-blue-300 
															to-gray-100 cursor-pointer rounded-sm"
													>
														Change File
													</button>
												</div>
											)
										}
										<FormMessage />
										</FormItem>
									)}
								/>

								<button
									type="submit"
									disabled={loader}
									className="flex items-center cursor-pointer font-semibold border-1 rounded-md py-1 px-4 hover:scale-105 transition-all duration-300 border-gray-400 text-black/90 bg-gradient-to-r from-blue-300 via-indigo-200 to-gray-100 shadow-sm shadow-blue-400"
								>
									{
										loader ? (
													<>
														<Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
													</>
													) : 
													("Submit")
									}
								</button>
							</form>
						</Form>
					</div>
				</div>
			</div>
			<Footer />
		</section>
	)
}

export default UploadNotes;
