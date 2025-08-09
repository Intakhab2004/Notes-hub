"use client"

import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";


export default function Footer(){
    return (
        <footer className="w-full bg-gradient-to-b from-blue-900 to-black text-white transition-colors">
            <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0 md:gap-10">
                <div className="flex flex-col space-y-4 w-full md:w-1/4">
                    <h3 className="text-3xl font-bold text-white">
                        NotesHub
                    </h3>
                    <p className="text-gray-400 text-sm">
                        Notes | Previous Year Questions | Test Series | Learning Platform
                    </p>
                </div>

                <div className="flex flex-col space-y-4 w-full md:w-1/4">
                    <h3 className="text-xl font-semibold text-white">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link href="/notes-collections" className="hover:text-white transition-colors">Notes</Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col space-y-4 w-full md:w-1/4">
                    <h4 className="text-xl font-semibold text-white">
                        Contact
                    </h4>
                    <a
                        href="mailto:ikbalam4648@gmail.com"
                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        <FaEnvelope className="text-blue-400 mr-3" />
                        <span>ikbalam4648@gmail.com</span>
                    </a>
                    <a
                        href="tel:+919472XXXXXX"
                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        <FaPhoneAlt className="text-blue-400 mr-3" />
                        <span>+91 9472XXXXXX</span>
                    </a>
                </div>

                <div className="flex flex-col space-y-4 w-full md:w-1/4">
                    <h4 className="text-xl font-semibold text-white">
                        Follow Me
                    </h4>
                    <div className="flex space-x-4 text-gray-400 text-2xl">
                        <a
                            href="https://github.com/Intakhab2004" 
                            target="_blank"
                            className="hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                            <FaGithub/>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/intakhab-alam-996a1b323" 
                            target="_blank"
                            className="hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                            <FaLinkedin/>
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 py-6 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Intakhab Alam. All rights reserved.
            </div>
        </footer>
    )
}

