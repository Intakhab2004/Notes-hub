"use client"

import { Notes } from "@/models/Notes";
import img3 from "@/assets/img3.jpg"
import { User } from "@/models/User";
import DateFormat from "./DateFormat";
import { FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import { useRouter } from "next/navigation";


export default function NoteCard({ note }: { note: Notes }) {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(`/notes/${note._id}`)}
			className="group w-[10rem] md:w-[13rem] lg:w-[17rem] bg-gradient-to-br from-[#FAF9EE] to-[#DCCFC0] dark:from-[#001f3f] dark:to-[#2a2a2a]
				rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 overflow-hidden flex flex-col transition-all duration-300 cursor-pointer"
		>
			<div className="relative w-full h-28 md:h-36 bg-gray-100 dark:bg-gray-700 overflow-hidden">
				<img
					src={`${note.fileURL.match(/\.(jpg|jpeg|png|webp)$/i) ? note.fileURL : img3.src}`}
					alt={note.title}
					className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
				/>
			</div>

			<div className="px-4 py-2 flex flex-col flex-grow">
				<h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
					{note.title}
				</h3>

				<p className="hidden md:block text-sm text-gray-600 dark:text-gray-300 italic mb-2">
					Subject: <span className="text-gray-800 dark:text-white not-italic">{note.subject}</span>
				</p>

				<div className="hidden md:flex flex-wrap gap-2 mb-2">
					{
                        note.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-800 dark:to-green-900
                                    text-green-700 dark:text-green-300 text-xs font-semibold px-2 py-1 rounded-full shadow-sm"
                            >
                                {tag}
                            </span>
                        ))
                    }
				</div>

				<p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 italic">
					Uploaded By: <span className="text-gray-800 dark:text-white not-italic">{(note.uploadedBy as User).username}</span>
				</p>

				<DateFormat rawDate={note.createdAt} />

				<div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-300 dark:border-gray-700">
					<button className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:scale-110 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300">
						<FcLike size={18} /> <span className="font-medium text-sm">{note.likes.length}</span>
					</button>

					<button className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:scale-110 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300">
						<FaComment size={14} /> <span className="font-medium text-sm">{note.comments.length}</span>
					</button>
				</div>
			</div>
		</div>
	)
}