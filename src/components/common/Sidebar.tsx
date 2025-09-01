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
		<div className="hidden md:flex flex-col min-h-full w-64 bg-gradient-to-r from-[#FAF9EE] to-[#e1dfc5] dark:from-[#001f3f] dark:to-[#272525] shadow-2xl overflow-hidden">
			<nav className="flex flex-col pt-12 pb-3 gap-2">
				{
					!session && (
						<Link 
							href="/" 
							className={`flex gap-3 items-center font-semibold py-1 px-3 rounded-lg transition-all duration-300
								hover:bg-green-100 dark:hover:bg-green-900 text-gray-900 dark:text-gray-200`}
						>
							<FaHome className="w-5 h-5"/> Home
						</Link>
					)
				}
				<Link 
					href="/notes-collections" 
					className={`flex gap-3 items-center font-semibold py-1 px-3 rounded-lg transition-all duration-300
						${pathName === "/notes-collections" ? "bg-green-600 text-white shadow-md" : "hover:bg-green-100 dark:hover:bg-green-900 text-gray-900 dark:text-gray-200"}`}
				>
					<NotebookText className='w-5 h-5' /> Notes
				</Link>
				{
					session && (
						<Link 
							href="/profile" 
							className={`flex gap-3 items-center font-semibold py-1 px-3 rounded-lg transition-all duration-300
								${pathName === "/profile" ? "bg-green-600 text-white shadow-md" : "hover:bg-green-100 dark:hover:bg-green-900 text-gray-900 dark:text-gray-200"}`}
						>	
							<LayoutDashboard className='w-5 h-5' /> My Profile
						</Link>
					)
				}
				{
					session && (
						<Link 
							href="/dashboard" 
							className={`flex gap-3 items-center font-semibold py-1 px-3 rounded-lg transition-all duration-300
								${pathName === "/dashboard" ? "bg-green-600 text-white shadow-md" : "hover:bg-green-100 dark:hover:bg-green-900 text-gray-900 dark:text-gray-200"}`}
						>	
							<StickyNote className='w-5 h-5' /> My Notes
						</Link>
					)
				}
				{
					session && (
						<Link 
							href="/upload-notes" 
							className={`flex gap-3 items-center font-semibold py-1 px-3 rounded-lg transition-all duration-300
								${pathName === "/upload-notes" ? "bg-green-600 text-white shadow-md" : "hover:bg-green-100 dark:hover:bg-green-900 text-gray-900 dark:text-gray-200"}`}
						>
							<UploadIcon className='w-5 h-5'/> Upload Notes
						</Link>
					)
				}
			</nav>

			<div className="w-10/12 h-[1px] my-2 bg-gray-300 dark:bg-gray-700 mx-auto"></div>

			<div className="flex flex-col gap-2">
				{
					session && (
						<Link 
							href="/update-profile"
							className={`flex gap-3 items-center font-semibold py-1 px-3 rounded-lg transition-all duration-300
								${pathName === "/update-profile" ? "bg-green-600 text-white shadow-md" : "hover:bg-green-100 dark:hover:bg-green-900 text-gray-900 dark:text-gray-200"}`}
						>
							<Settings className='w-5 h-5'/> Settings
						</Link>
					)
				}
				{
					session && (
						<button 
							onClick={() => signOut({callbackUrl: "/"})} 
							className="flex gap-3 items-center font-semibold py-1 px-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-300"
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
