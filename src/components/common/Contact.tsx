"use client"

import emailjs from 'emailjs-com';
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react"
import { FaEnvelope, FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa"
import { toast } from 'sonner';


export default function ContactUs(){
    const form = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        emailjs.sendForm(
            "service_wertai9",  // Service Id
            "template_g7mmob6",  // Template Id
            form.current,
            "1pBL_9NsfZ5ceFAvP"  // Public API key
        )
        .then((result: {status: number, text: string}) => {
            console.log(result.text);
            toast.success("Message sent successfully!");
            setLoading(false);
            form.current?.reset();
        })
        .catch((error: {status: number, text: string}) => {
            console.log(error.text);
            setLoading(false);
            toast.error("Something went wrong while sending the message");
        })
    }


    return (
        <section className="w-full px-3 md:px-6 py-28 bg-gradient-to-br from-[#ffffff] to-[#afafb1] text-gray-800 dark:from-[#0f0f0f] 
            dark:to-[#1f1f1f] dark:text-gray-100 transition-colors duration-500"
        >
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-3 font-extrabold"
            >
                Contact Us, If you have any query.
            </h1>
            <p className="w-full md:w-1/2 text-xl mb-16 text-gray-600 dark:text-gray-300 font-semibold">
               NotesHub – Where your ideas find a home and your knowledge grows without limits.
            </p>

            <div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl px-5 py-10 md:p-10 flex flex-col justify-between space-y-40 border 
                        border-gray-100 dark:border-gray-700 transition-colors duration-300"
                    >
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                                NotesHub
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-base">
                                Notes | Test Series | PYQs
                            </p>
                        </div>

                        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm">
                            <div className="flex items-center">
                                <FaEnvelope className="text-blue-600 dark:text-blue-400 mr-3" size={18} />
                                <span>ikbalam4648@gmail.com</span>
                            </div>
                            <div className="flex items-center">
                                <FaPhoneAlt className="text-blue-600 dark:text-blue-400 mr-3" size={18} />
                                <span>+91 9472XXXXXX</span>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <a
                                href="https://github.com/Intakhab2004"
                                target="_blank"
                            >
                                <FaGithub className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-2xl transition-colors" />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/intakhab-alam-996a1b323"
                                target="_blank"
                            >
                                <FaLinkedin className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 text-2xl transition-colors" />
                            </a>
                        </div>
                    </div>

                    <form
                        ref={form}
                        onSubmit={sendEmail}
                        className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl px-5 py-10 md:p-10 space-y-6 border border-gray-100 
                            dark:border-gray-700 transition-colors duration-300"
                    >
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder="Your Name"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 
                                text-sm rounded-lg text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 
                                text-sm rounded-lg text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                placeholder="What's on your mind"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 
                                text-sm rounded-lg text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none 
                                transition resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white 
                                py-3 px-6 rounded-xl cursor-pointer font-semibold shadow-md hover:shadow-lg transition-all text-center text-sm md:text-base w-full 
                                disabled:opacity-50"
                        >
                            {
                                loading ? (
                                            <div className="flex gap-2 justify-center items-center">
                                                Sending <Loader2 className="w-6 h-6 animate-spin" />
                                            </div>
                                        ) :
                                        ("Send Message")
                            }
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}