"use client"

import { PiUserListFill } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function DropdownMenuButtonDesktop() {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <div className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer">
                    <PiUserListFill size={20} className="text-gray-800 dark:text-white"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="start">
                <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/dashboard" className="w-full font-bold border-1 rounded-md py-1 px-4 text-center border-gray-400 bg-gray-300 dark:border-gray-700 dark:bg-gray-900">
                            Dashboard
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <button 
                            onClick={() => signOut({callbackUrl: "/"})} 
                            className="w-full font-semibold border-1 rounded-md py-1 px-4 transition-all duration-300 border-gray-400 
                            text-black/90 bg-gradient-to-r from-red-300 to-gray-100 shadow-sm"
                        >
                            Logout
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export function DropdownMenuButtonMobile() {
    const {data: session} = useSession();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <div className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer">
                    <PiUserListFill size={20} className="text-gray-800 dark:text-white"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="start">
                <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/" className="w-full font-bold border-1 rounded-md py-1 px-4 text-center border-gray-400 bg-gray-300 dark:border-gray-700 dark:bg-gray-900">
                            Home
                        </Link>
                    </DropdownMenuItem>
                    {
                        session && (
                            <DropdownMenuItem>
                                <Link href="/dashboard" className="w-full font-bold border-1 rounded-md py-1 px-4 text-center border-gray-400 bg-gray-300 dark:border-gray-700 dark:bg-gray-900">
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    <DropdownMenuItem>
                        <Link href="/notes-collections" className="w-full font-bold border-1 rounded-md py-1 px-4 text-center border-gray-400 bg-gray-300 dark:border-gray-700 dark:bg-gray-900">
                            Notes
                        </Link>
                    </DropdownMenuItem>
                    {
                        session && (
                            <DropdownMenuItem>
                                <Link href="/dashboard" className="w-full font-bold border-1 rounded-md py-1 px-4 text-center border-gray-400 bg-gray-300 dark:border-gray-700 dark:bg-gray-900">
                                    My Notes
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    {
                        session && (
                            <DropdownMenuItem>
                                <Link href="/upload-notes" className="w-full font-bold border-1 rounded-md py-1 px-4 text-center border-gray-400 bg-gray-300 dark:border-gray-700 dark:bg-gray-900">
                                    Upload Notes
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <Link href="/about" className="font-semibold">
                            About
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/contact" className="font-semibold">
                            Contact Us
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        {
                            !session ? (
                                            <button className="font-semibold border-1 rounded-md py-1 px-4 hover:scale-105 transition-all duration-300 border-gray-400 text-black/90 bg-gradient-to-r from-blue-300 via-indigo-200 to-gray-100 shadow-sm shadow-blue-400">
                                                <Link href="/sign-up">
                                                    Sign up
                                                </Link>
                                            </button>
                                        ) 
                                        : 
                                        (
                                            <button 
                                                onClick={() => signOut({callbackUrl: "/"})} 
                                                className="w-full font-semibold border-1 rounded-md py-1 px-4 transition-all duration-300 border-gray-400 
                                                text-black/90 bg-gradient-to-r from-red-300 to-gray-100 shadow-sm"
                                            >
                                                Logout
                                            </button>
                                        )
                        }
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
