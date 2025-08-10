"use client"

import { Notes } from "@/models/Notes";
import img3 from "@/assets/img3.jpg"
import { User } from "@/models/User";
import DateFormat from "./DateFormat";
import { FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import { useRouter } from "next/navigation";


export default function NoteCard({note}: {note: Notes}){
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/notes/${note._id}`)}
            className="group w-[48%] md:w-[30%] bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-gray-700 
            hover:scale-105 overflow-hidden flex flex-col transition-all duration-300"
        >
            {/* Image */}
            <div className="relative w-full h-30 md:h-50 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <img
                    src={`${note.fileURL.match(/\.(jpg|jpeg|png|webp)$/i) ? note.fileURL : img3.src}`}
                    alt={note.title}
                    className="w-full h-full object-fill transform transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-2 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-base md:text-xl font-semibold md:font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 
                        dark:group-hover:text-blue-400 transition-colors duration-300"
                >
                    Title: {note.title}
                </h3>

                {/* Subject */}
                <p className="hidden md:flex text-sm font-semibold text-gray-600 dark:text-gray-300 italic">
                    Subject: <span className="text-black dark:text-white not-italic">{note.subject}</span>
                </p>

                {/* Tags */}
                <div className="hidden md:flex flex-wrap gap-2 my-1">
                    {
                        note.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900
                                    text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                            >
                                {tag}
                            </span>
                        ))
                    }
                </div>
                
                {/* Uploaded By */}
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1 italic">
                    Uploaded By: <span className="text-black dark:text-white not-italic">{(note.uploadedBy as User).username}</span>
                </p>
                
                {/* Created at */}
                <DateFormat rawDate={note.createdAt} />
                

                {/* Likes and Comment */}
                <div className="flex items-center text-lg justify-around py-2 border-t dark:border-gray-700">
                    <button className="flex items-center gap-2 text-red-600 hover:scale-110 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer transition-all duration-300">
                        <FcLike /> <span className="font-medium">32</span>
                    </button>
                
                    <button className="flex items-center gap-2 text-blue-600 hover:scale-110 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-all duration-300">
                        <FaComment /> <span className="font-medium">{note.comments.length}</span>
                    </button>
                </div>  
            </div>
        </div>
    )
}