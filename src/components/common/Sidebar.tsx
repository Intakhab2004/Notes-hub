// Sidebar.tsx

import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col h-full w-60 bg-white dark:bg-[rgb(31,31,46)] p-6 shadow-md">
      <nav className="flex flex-col gap-10">
        <Link href="/" className="text-black dark:text-white font-medium hover:underline">Home</Link>
        <Link href="/dashboard" className="text-black dark:text-white font-medium hover:underline">My Notes</Link>
        <Link href="/upload-notes" className="text-black dark:text-white font-medium hover:underline">Upload Notes</Link>
      </nav>
    </div>
  )
}

export default Sidebar
