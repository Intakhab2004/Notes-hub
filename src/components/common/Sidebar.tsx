"use client"

import { LayoutDashboard, LogOut, NotebookText, Settings, StickyNote, UploadIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome } from 'react-icons/fa'

const Sidebar = () => {
	const pathName = usePathname();
	const {data: session} = useSession();


	return (
		<div className="hidden md:flex flex-col min-h-full w-60 bg-gradient-to-l from-purple-100 to-white dark:bg-gradient-to-r dark:from-black/70 dark:to-blue-950 shadow-2xl">
			<nav className="flex flex-col p-6 gap-2">
				{
					!session && (
						<Link 
							href="/" 
							className={`flex gap-2 items-center text-black dark:text-white font-medium py-1 px-2 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-md`}
						>
							<FaHome /> Home
						</Link>
					)
				}
				<Link 
					href="/notes-collections" 
					className={`flex gap-2 items-center text-black dark:text-white font-medium py-1 px-2 ${pathName === "/notes-collections" ? "rounded-sm text-blue-600 dark:bg-gray-600 bg-gray-200 shadow-lg" : "hover:bg-gray-300 dark:hover:bg-gray-800 rounded-md"}`}
				>
					<NotebookText className='w-5 h-5' /> Notes
				</Link>
				{
					session && (
						<Link 
							href="/profile" 
							className={`flex gap-2 items-center text-black dark:text-white font-medium py-1 px-2 ${pathName === "/profile" ? "rounded-sm text-blue-600 dark:bg-gray-600 bg-gray-200 shadow-lg" : "hover:bg-gray-300 dark:hover:bg-gray-800 rounded-md"}`}
						>	
							<LayoutDashboard className='w-5 h-5' /> My Profile
						</Link>
					)
				}
				{
					session && (
						<Link 
							href="/dashboard" 
							className={`flex gap-2 items-center text-black dark:text-white font-medium py-1 px-2 ${pathName === "/dashboard" ? "rounded-sm text-blue-600 dark:bg-gray-600 bg-gray-200 shadow-lg" : "hover:bg-gray-300 dark:hover:bg-gray-800 rounded-md"}`}
						>	
							<StickyNote className='w-5 h-5' /> My Notes
						</Link>
					)
				}
				{
					session && (
						<Link 
							href="/upload-notes" 
							className={`flex gap-2 items-center text-black dark:text-white font-medium py-1 px-2 ${pathName === "/upload-notes" ? "rounded-sm text-blue-600 dark:bg-gray-600 bg-gray-200 shadow-lg" : "hover:bg-gray-300 dark:hover:bg-gray-800 rounded-md"}`}
						>
							<UploadIcon className='w-5 h-5'/> Upload Notes
						</Link>
					)
				}
			</nav>
			<div className="w-10/12  h-[1px] mb-3 bg-gray-400 dark:text-gray-400"></div>
			<div className="flex flex-col px-6 py-3">
				{
					session && (
						<Link 
							href="/update-profile"
							className={`flex gap-2 items-center text-black dark:text-white font-medium py-1 px-2 ${pathName === "/update-profile" ? "rounded-sm text-blue-600 dark:bg-gray-600 bg-gray-200 shadow-lg" : "hover:bg-gray-300 dark:hover:bg-gray-800 rounded-md"}`}
						>
							<Settings className='w-5 h-5'/> Setting
						</Link>
					)
				}
				{
					session && (
						<button 
							onClick={() => signOut({callbackUrl: "/"})} 
							className="flex gap-2 items-center text-gray-500 dark:text-gray-400 font-medium py-1 px-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 rounded-md"
						>
							<LogOut className='w-5 h-5'/> Logout
						</button>
					)
				}
			</div>
		</div>
	)
}

export default Sidebar;
