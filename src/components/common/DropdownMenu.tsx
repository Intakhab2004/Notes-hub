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
import { Contact2Icon, IndentIncrease, LayoutDashboard, LogIn, LogOut, LogOutIcon, LucideHome, NotebookPen, Settings, StickyNote, UploadIcon } from "lucide-react";


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
                        <Link href="/dashboard" className=" flex gap-2 items-center font-semibold">
                            <LayoutDashboard /> Dashboard
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <button 
                            onClick={() => signOut({callbackUrl: "/"})} 
                            className="flex gap-2 items-center text-gray-500 dark:text-gray-400 font-medium cursor-pointer"
                        >
                            <LogOut className='w-5 h-5'/> Logout
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
                        <Link href="/" className=" flex gap-2 items-center font-semibold">
                            <LucideHome /> Home
                        </Link>
                    </DropdownMenuItem>
                    {
                        session && (
                            <DropdownMenuItem>
                                <Link href="/profile" className=" flex gap-2 items-center font-semibold">
                                    <LayoutDashboard /> My Profile
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    <DropdownMenuItem>
                        <Link href="/notes-collections" className=" flex gap-2 items-center font-semibold">
                            <NotebookPen /> Notes
                        </Link>
                    </DropdownMenuItem>
                    {
                        session && (
                            <DropdownMenuItem>
                                <Link href="/dashboard" className=" flex gap-2 items-center font-semibold">
                                    <StickyNote /> My Notes
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    {
                        session && (
                            <DropdownMenuItem>
                                <Link href="/upload-notes" className=" flex gap-2 items-center font-semibold">
                                    <UploadIcon /> Upload Notes
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    {session && <DropdownMenuSeparator />}

                    <DropdownMenuItem>
                        <Link href="/about" className=" flex gap-2 items-center font-semibold">
                            <IndentIncrease/> About
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/contact" className=" flex gap-2 items-center font-semibold">
                            <Contact2Icon/> Contact Us
                        </Link>
                    </DropdownMenuItem>
                    {
                        session && (
                            <DropdownMenuItem>
                                <Link href="/update-profile" className=" flex gap-2 items-center font-semibold">
                                    <Settings className='w-5 h-5'/> Setting
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        {
                            !session ? (
                                            <Link href="/sign-up" className=" flex gap-2 items-center font-semibold">
                                                <LogIn /> Sign up
                                            </Link>
                                        ) 
                                        : 
                                        (
                                            <button 
                                                onClick={() => signOut({callbackUrl: "/"})} 
                                                className="flex gap-2 items-center justify-center w-full font-semibold border-1 rounded-md py-1 px-4 transition-all duration-300 border-gray-400 
                                                text-black/90 bg-gradient-to-r from-red-300 to-gray-100 shadow-sm"
                                            >
                                                <LogOutIcon className="text-black"/> Logout
                                            </button>
                                        )
                        }
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
