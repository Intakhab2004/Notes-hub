"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
	const pathName = usePathname();
	const {data: session} = useSession();


	return (
		<div className="hidden md:flex flex-col min-h-full w-60 bg-gradient-to-l from-purple-100 to-white dark:bg-gradient-to-r dark:from-black/70 dark:to-blue-950 shadow-2xl">
			<nav className="flex flex-col p-6 gap-2">
				<Link 
					href="/" 
					className={`text-black dark:text-white font-medium py-2 px-1 hover:underline`}
				>
					Home
				</Link>
				<Link 
					href="/notes-collections" 
					className={`text-black dark:text-white font-medium py-1 px-2 ${pathName === "/notes-collections" ? "rounded-sm text-blue-600 dark:bg-gray-600 bg-gray-200 shadow-lg" : "hover:underline"}`}
				>
					Notes
				</Link>
				{
					session && (
						<Link 
							href="/dashboard" 
							className={`text-black dark:text-white font-medium py-1 px-2 ${pathName === "/dashboard" ? "rounded-sm text-blue-600 dark:bg-gray-600 bg-gray-200 shadow-lg" : "hover:underline"}`}
						>	
							My Notes
						</Link>
					)
				}
				{
					session && (
						<Link 
							href="/upload-notes" 
							className={`text-black dark:text-white font-medium py-1 px-2 ${pathName === "/upload-notes" ? "rounded-sm text-blue-600 dark:bg-gray-600 bg-gray-200 shadow-lg" : "hover:underline"}`}
						>
								Upload Notes
						</Link>
					)
				}
			</nav>
		</div>
	)
}

export default Sidebar
