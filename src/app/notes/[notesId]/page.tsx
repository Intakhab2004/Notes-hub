"use client"

import dynamic from "next/dynamic";
import DateFormat from "@/components/common/DateFormat";
import Navbar from "@/components/common/Navbar"
import Sidebar from "@/components/common/Sidebar"
import { Notes } from "@/models/Notes";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { FaComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { User } from "@/models/User";
import CommentBox from "@/components/common/CommentSection";
import Footer from "@/components/common/Footer";
import { useSession } from "next-auth/react";

const PdfViewer = dynamic(() => import("@/components/common/PdfViewer"), {
    ssr: false,
});



export default function NotesPage(){
    const [loader, setLoader] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [noteDetails, setNoteDetails] = useState<Notes | null>(null);

    const params = useParams();
    const {data: session} = useSession();
    const router = useRouter();

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

                    //Setting isLiked value
                    const note = result.data.noteDetails;
                    const likes = note.likes || [];
                    setIsLiked(session?.user?._id ? likes.includes(session.user._id) : false);

                    setTotalLikes(likes.length);
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

    const deleteHandler = async() => {
        setDeleteLoader(true);

        try{
            const result = await axios.delete(`/api/upload-notes/${noteId}`);

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
                console.log("Note deleted successfully!");
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

                router.push("/dashboard");
            }
        }
        catch(error){
            console.log("Something went wrong while deleting the note: ", error);
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

    const likeHandler = async() => {
        try{
            if(!session || !session.user){
                console.log("You are not logged in");
				
				const toastId = toast(
					"Failed",
					{
						description: "You must be logged in to like the post",
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

            const prevLiked = isLiked;
            const prevCount = totalLikes;

            setIsLiked(!prevLiked);
            setTotalLikes(prevLiked ? prevCount - 1 : prevCount + 1);

            const result = await axios.post(`/api/upload-notes/${noteId}/likes`, {userId: session.user._id});
            if(!result.data.success){
                console.log("Something went wrong: ", result.data.message);

                setIsLiked(prevLiked);
                setTotalLikes(prevCount);

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
                const toastId = toast(
					"Success",
					{
						description: result.data.liked ? "You liked the post" : "You unliked the post",
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
    }


    return (
        <section>
            <Navbar/>
            <div className="min-h-screen flex flex-1 pt-17 overflow-y-auto">
                <Sidebar/>

                {/* Main Container */}
                <div className="min-h-full w-full flex flex-col items-center p-2 bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#01012e] transition-all">
                   { 
                        loader ? (
                            <div className="flex-col md:flex gap-3 mt-40 items-center justify-center text-xl font-semibold text-gray-900 dark:text-white">
                                Please wait while your content is loading 
                                <Loader2 className="w-8 h-8 animate-spin" />
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
                                <div className="w-full flex flex-col items-center mb-10">
                                    <h1 className="text-2xl md:text-3xl font-bold my-10 text-gray-900 dark:text-white">
                                        Details of the selected note
                                    </h1>

                                    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 md:px-6">
                                        {/* content display container */}
                                        <div className="col-span-1 lg:col-span-7">
                                            <div className="w-full p-4 rounded-lg shadow-md bg-gray-200 dark:bg-gradient-to-r from-[#1a1a1a] to-[#02021b] transition-all duration-300">
                                                {
                                                    noteDetails.fileURL.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                                                        <img
                                                            src={noteDetails.fileURL}
                                                            alt="Note Preview"
                                                            className="rounded-md object-contain w-full max-h-[80vh] shadow-lg"
                                                        />
                                                    ) : (
                                                        <PdfViewer fileUrl={noteDetails.fileURL} />
                                                    )
                                                }
                                            </div>
                                        </div>

                                        {/* Note details container */}
                                        <div className="col-span-1 lg:col-span-5">
                                            <div className="w-full bg-gray-100 dark:bg-transparent px-0 md:px-4">
                                                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300">
                                                    <div className="px-4 md:px-6 py-6 flex flex-col gap-2 md:gap-4">
                                                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white italic">
                                                            Title: {noteDetails.title}
                                                        </h1>

                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">
                                                                Description
                                                            </p>
                                                            <div className="p-4 text-sm bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200">
                                                                {noteDetails.description}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">
                                                                Subject
                                                            </p>
                                                            <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-md text-sm w-fit">
                                                                {noteDetails.subject}
                                                            </div>
                                                        </div>

                                                        {
                                                            noteDetails.tags.length > 0 && (
                                                                <div>
                                                                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">
                                                                        Tags
                                                                    </p>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {
                                                                            noteDetails.tags.map((tag, idx) => (
                                                                                <span
                                                                                    key={idx}
                                                                                    className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-xs"
                                                                                >
                                                                                    #{tag}
                                                                                </span>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        }

                                                        {
                                                            noteDetails.uploadedBy && (
                                                                <div>
                                                                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">
                                                                        Uploaded By
                                                                    </p>
                                                                    <div className="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-md text-sm w-fit">
                                                                        {(noteDetails.uploadedBy as User).username}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }

                                                        <div className="ml-[12rem] md:ml-[21rem]">
                                                            <DateFormat rawDate={noteDetails.createdAt} />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center text-lg justify-around py-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                                                        <button
                                                            onClick={likeHandler}
                                                            className={`flex items-center gap-2 ${isLiked ? "text-red-600" : "text-red-200"} hover:scale-110 hover:text-red-700 dark:hover:text-red-300 cursor-pointer transition-all duration-300`}
                                                        >
                                                            {isLiked ? <FcLike /> : <FcLikePlaceholder />}
                                                            <span className="font-medium">{totalLikes}</span>
                                                        </button>

                                                        <button
                                                            onClick={() => setShowComments(!showComments)}
                                                            className="flex items-center gap-2 text-blue-600 hover:scale-110 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-all duration-300"
                                                        >
                                                            <FaComment /> <span className="font-medium">{noteDetails.comments.length}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                {
                                                    showComments && (
                                                        <CommentBox
                                                            noteId={noteDetails._id as string}
                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                            comments={noteDetails.comments as any}
                                                            username={(noteDetails.uploadedBy as User).username}
                                                        />
                                                    )
                                                }
                                                {
                                                    (session && String(noteDetails.uploadedBy._id) === String(session.user._id)) && (
                                                        <button
                                                            onClick={deleteHandler}
                                                            disabled={deleteLoader}
                                                            className="mt-6 px-5 py-2 text-base text-black/90 font-semibold rounded-md border 
                                                                cursor-pointer border-red-600 bg-red-400 hover:border-black/90 
                                                                dark:hover:border-white/90 transition-all duration-300"
                                                        >
                                                            {
                                                                deleteLoader ? (
                                                                    <div className="flex items-center">
                                                                        <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                                                    </div>
                                                                )
                                                                :
                                                                "Delete"
                                                            }
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                   }
                </div>
            </div>
            <Footer />
        </section>
    )
}