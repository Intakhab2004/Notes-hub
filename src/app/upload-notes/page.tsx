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
				<div className="min-h-full w-full flex flex-col items-center p-2 md:pr-35 bg-[#FAF9EE] dark:bg-[#001f3f] transition-all">
					<h1 className="text-2xl md:text-3xl lg:text-3xl font-bold pt-12">
						Upload your Notes here
					</h1>

					{/* Notes upload form */}
					<div className="w-full max-w-2xl p-6 md:p-10 my-12 mb-18 space-y-8 bg-white dark:bg-[#1b1b31] rounded-2xl shadow-lg dark:shadow-gray-700 border border-gray-200 dark:border-gray-600 transition-all duration-300">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">

								{/* Title */}
								<FormField
									control={form.control}
									name="title"
									render={({field}) => (
										<FormItem>
											<FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Title</FormLabel>
											<FormControl>
												<Input
													placeholder="Title of notes"
													{...field}
													className="bg-gray-50 dark:bg-[#2a2a3b] border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Description */}
								<FormField
									control={form.control}
									name="description"
									render={({field}) => (
										<FormItem>
											<FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Description</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Write about notes"
													rows={4}
													{...field}
													className="bg-gray-50 dark:bg-[#2a2a3b] border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Tags */}
								<FormField
									control={form.control}
									name="tags"
									render={({field}) => (
										<FormItem>
											<FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Tags</FormLabel>
											<FormControl>
												<TagsInput value={field.value} onChange={field.onChange} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Subject */}
								<FormField
									control={form.control}
									name="subject"
									render={({field}) => (
										<FormItem>
											<FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Subject</FormLabel>
											<FormControl>
												<Input
													placeholder="Subject"
													{...field}
													className="bg-gray-50 dark:bg-[#2a2a3b] border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* File Upload */}
								<FormField
									control={form.control}
									name="file"
									render={({ field: { onChange, ref } }) => (
										<FormItem>
											<FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Upload File</FormLabel>
											<FormControl>
												<div>
													<input
														type="file"
														accept=".pdf,.jpg,.jpeg,.png,.webp"
														onChange={(e) => {
															const file = e.target.files?.[0]
															if(file){
																onChange(e.target.files)
																setFileName(file.name)
																const previewUrl = URL.createObjectURL(file)
																setPreviewURL(previewUrl)
															}
														}}
														ref={ref}
														className="hidden"
														id="file-upload"
													/>

													{/* Upload Area */}
													<label
														htmlFor="file-upload"
														className="h-80 w-full md:w-1/2 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 dark:bg-[#2a2a3b] hover:shadow-lg transition-all duration-300"
													>
														{
															previewURL ? (
																fileName.match(/\.(jpg|jpeg|png|webp)$/i) ? (
																	<img src={previewURL} alt="Preview" className="object-contain h-full w-full" />
																) 
																: 
																fileName.endsWith(".pdf") ? (
																	<iframe src={previewURL} className="w-full h-full border-none" />
																) 
																: 
																(
																	<p className="text-sm text-yellow-500">Preview not supported</p>
																)
															) : (
																<div className="flex flex-col items-center justify-center">
																	<CloudUpload size={50} className="text-green-600 dark:text-green-400 mb-3"/>
																	<p className="font-semibold text-gray-700 dark:text-gray-200">
																		Choose a file
																	</p>
																	<div className="flex flex-col items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
																		<p>
																			.pdf | .jpg | .jpeg | .png | .webp
																		</p>
																		<p>
																			Max Upload size is 10 MB
																		</p>
																	</div>
																</div>
															)
														}
													</label>
												</div>
											</FormControl>

											{fileName && (
												<div className="mt-3 flex flex-col md:flex-row md:items-center md:gap-4">
													<p className="text-sm text-gray-700 dark:text-gray-300">
														Selected file: <strong>{fileName}</strong>
													</p>

													<button
														type="button"
														onClick={() => document.getElementById("file-upload")?.click()}
														className="mt-2 md:mt-0 px-4 py-2 text-sm font-medium rounded-lg shadow bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300"
													>
														Change File
													</button>
												</div>
											)}
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Submit Button */}
								<button
									type="submit"
									disabled={loader}
									className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300"
								>
									{loader ? <><Loader2 className="animate-spin"/> Please wait</> : "Submit"}
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
