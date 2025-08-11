"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { DropdownMenuButtonDesktop } from "./DropdownMenu";
import { DropdownMenuButtonMobile } from "./DropdownMenu";



const navLinks = ["Home", "Notes", "About", "Contact"];


export default function Navbar(){
    const pathName = usePathname();
    const {data: session} = useSession();

    return (
        <nav className="fixed top-0 z-50 w-full bg-white/70 dark:bg-[#151414] border-b backdrop-blur-md shadow-lg">
            <div className="w-11/12 mx-auto py-4 flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold hover:text-blue-700 cursor-pointer transition-all duration-500">
                    NotesHub
                </h1>

                <div className="hidden md:flex gap-7 items-center text-md font-bold">
                    {
                        navLinks.map((link, index) => {
                            const href = link === "Home" ? "/" : link === "Notes" ? "/notes-collections" : `/${link.toLowerCase()}`
                            const activeLink = pathName === href;
                            return (
                                <Link 
                                    key={index} href={href}
                                    className={`hover:text-blue-700 transition-all duration-500 ${activeLink ? "border-1 rounded-sm border-blue-600 text-blue-600 dark:bg-blue-300 bg-gray-100 shadow-sm shadow-blue-400 dark:shadow-none py-[2px] px-3" : "hover:-translate-y-1"}`}
                                >
                                    {link}
                                </Link>
                            )
                        })
                    }
                </div>

                <div className="flex gap-3 md:gap-4 items-center">
                    {
                        !session ? (
                                    <button className="hidden md:flex font-semibold border-1 rounded-md py-1 px-4 hover:scale-105 transition-all duration-300 border-gray-400 text-black/90 bg-gradient-to-r from-blue-300 via-indigo-200 to-gray-100 shadow-sm shadow-blue-400">
                                        <Link href="/sign-up">
                                            Sign up
                                        </Link>
                                    </button>
                                    ) 
                                    : 
                                    (
                                        <div className="hidden md:flex">
                                            <DropdownMenuButtonDesktop />
                                        </div>
                                    )
                    }
                    <div className="hidden md:flex">
                        <ThemeToggle/>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-3 md:hidden">
                    <DropdownMenuButtonMobile />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}