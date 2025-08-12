"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Comments } from "@/models/Comments";
import axios from "axios";
import { User } from "@/models/User";
import { useForm } from "react-hook-form";
import z from "zod";
import { commentSchema } from "@/schemas/commentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import DateFormat from "./DateFormat";


interface CommentBoxProps {
    noteId: string;
    comments: Comments[];
    username: string
}

const COMMENTS_PER_PAGE = 5;

export default function CommentBox({ noteId, comments, username }: CommentBoxProps) {
    const { data: session } = useSession();

    const [loader, setLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [allComments, setAllComments] = useState(comments);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allComments.length / COMMENTS_PER_PAGE);
    const paginatedComments = allComments.slice((currentPage - 1) * COMMENTS_PER_PAGE, currentPage * COMMENTS_PER_PAGE);

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema)
    })

    const handlePostComment = async (data: z.infer<typeof commentSchema>) => {
        setLoader(true);

        try{
            const result = await axios.post("/api/comment", {
                content: data.content,
                notesId: noteId
            })

            if(!result.data.success){
                console.log("Something went wrong while posting comment");
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
                setAllComments([result.data.newComment, ...allComments]);
                setCurrentPage(1);

                const toastId = toast(
                    result.data.message,
                    {
                        description: "You commented on a post",
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
        catch(error){
            console.log("Something went wrong ", error);
            
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

    const deleteHandler = async(id: string) => {
        setDeleteLoader(true);

        try{
            const result = await axios.delete(`/api/comment/${id}`, {
                data: {notesId: noteId}
            })

            if(!result.data.success){
                console.log("An error occured: ", result.data.message);
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
                setAllComments((prevComments) => {
                    const updated = prevComments.filter(comment => (comment._id as string) !== id);
                    
                    if((currentPage - 1) * COMMENTS_PER_PAGE >= updated.length && currentPage > 1){
                        setCurrentPage(currentPage - 1);
                    }
                    return updated;
                })

                console.log("Comment deleted successfully!");
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
        catch(error){
            console.log("Something went wrong while deleting the comment: ", error);
            const toastId = toast(
                "Something went wrong while deleting",
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
            setDeleteLoader(false);
        }
    }


    return (
        <div className="w-full max-w-3xl mt-4 p-4 rounded bg-white dark:bg-gray-800 shadow-md">
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Comments</h3>

        {/* Input box */}
        {
            session ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handlePostComment)} className="space-y-2">
                        <FormField
							control={form.control}
							name="content"
							render={({field}) => (
								<FormItem>
										<FormControl>
											<Textarea placeholder="Write about notes" rows={3}
												{...field} 
											/>
										</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

                        <button
                            type="submit"
                            disabled={loader}
                            className="flex items-center cursor-pointer font-semibold border-1 rounded-md mb-4 py-1 px-4 text-white bg-blue-500 hover:bg-blue-700"
                        >
                            {
                                loader ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                            </>
                                         ) : 
                                         ("Post")
                            }
                        </button>
                    </form>
                </Form>
            ) : (
                    <p className="text-sm text-gray-500">
                        Log in to post a comment.
                    </p>
                )
            }

        {/* Comment List */}
        <ul className="space-y-3">
            {
                paginatedComments.length === 0 ? (
                    <li className="text-gray-500 text-sm">No comments yet.</li>
                ) : (
                        paginatedComments.map((comment) => (
                            <li 
                                key={comment._id as string} 
                                className="border-1 border-gray-200 dark:border-gray-700 py-2 px-3 rounded-sm shadow-lg"
                            >
                                <div className="text-sm font-medium text-gray-800 dark:text-white italic">
                                    By: {(comment.userId as User)?.username === username ? "me" : (comment.userId as User)?.username}
                                </div>

                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    {comment.content}
                                </div>

                                <div className="flex justify-between items-center">
                                    <DateFormat rawDate={comment.createdAt} />
                                    {
                                        (session && (comment.userId as User)?.username === username) && (
                                            <button
                                                onClick={() => deleteHandler(comment._id as string)}
                                                disabled={deleteLoader}
                                                className="text-[0.9rem] bg-gray-300 px-[4px] py-[1px] rounded-sm border border-black/90 dark:bg-gray-700
                                                    dark:border-white/80 cursor-pointer"
                                            >
                                                {
                                                    deleteLoader ? "Please wait" : "Delete"
                                                }
                                            </button>
                                        )
                                    }
                                </div>
                            </li>
                        ))
                    )
            }
        </ul>

        {/* Pagination */}
        {totalPages > 1 && (
            <div className="mt-4 flex justify-between text-sm">
            <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded disabled:opacity-50"
            >
                Next
            </button>
            </div>
        )}
        </div>
    );
}
