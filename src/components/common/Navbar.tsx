"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { DropdownMenuButtonDesktop, DropdownMenuButtonMobile } from "./DropdownMenu";

const navLinks = ["Home", "Notes", "About", "Contact"];

export default function Navbar() {
    const pathName = usePathname();
    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 z-50 w-full bg-[#FAF9EE] dark:bg-[#0f0f1a] border-b border-gray-300 dark:border-gray-700 shadow-sm transition-colors duration-500">
            <div className="w-11/12 mx-auto py-4 flex justify-between items-center">
                <h1
                    className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white cursor-pointer
                        hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                    NotesHub
                </h1>

                <div className="hidden md:flex gap-6 items-center text-md font-semibold">
                    {
                        navLinks.map((link, index) => {
                            const href = link === "Home" ? "/" : link === "Notes" ? "/notes-collections" : `/${link.toLowerCase()}`;
                            const activeLink = pathName === href;
                            return (
                                <Link
                                    key={index}
                                    href={href}
                                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                        activeLink
                                            ? "bg-green-600 text-white shadow-md"
                                            : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#1a1a2a] hover:text-green-600 dark:hover:text-green-400"
                                    }`}
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
                            <Link
                                href="/sign-up"
                                className="hidden md:flex font-semibold py-2 px-5 rounded-lg text-white bg-green-600 hover:bg-green-700 
                                    shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Sign Up
                            </Link>
                        ) 
                        : 
                        (
                            <div className="hidden md:flex">
                                <DropdownMenuButtonDesktop />
                            </div>
                        )
                    }
                    <div className="hidden md:flex">
                        <ThemeToggle />
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