"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Sidebar = () => {
	const {data: session} = useSession();


	return (
		<div className="hidden md:flex flex-col min-h-full w-60 bg-gradient-to-l from-purple-100 to-white dark:bg-gradient-to-r dark:from-black/70 dark:to-blue-950 shadow-2xl">
			<nav className="flex flex-col p-6 gap-6">
				<Link href="/" className="text-black dark:text-white font-medium hover:underline">Home</Link>
				<Link href="/notes-collections" className="text-black dark:text-white font-medium hover:underline">Notes</Link>
				{
					session && (
						<Link href="/dashboard" className="text-black dark:text-white font-medium hover:underline">My Notes</Link>
					)
				}
				{
					session && (
						<Link href="/upload-notes" className="text-black dark:text-white font-medium hover:underline">Upload Notes</Link>
					)
				}
			</nav>
		</div>
	)
}

export default Sidebar
