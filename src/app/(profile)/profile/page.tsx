"use client"

import Navbar from "@/components/common/Navbar"
import Sidebar from "@/components/common/Sidebar"
import Link from "next/link"
import { Edit, Loader2 } from "lucide-react"
import Footer from "@/components/common/Footer"
import { User } from "@/models/User"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { Profile } from "@/models/Profile"

export default function ProfilePage(){
    const [userData, setUserData] = useState<User | null>(null);
    const [numberOfNotes, setNumberOfNotes] = useState(0);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const getDetails = async() => {
            setLoader(true);
            try{
                const result = await axios.get("/api/user-profile");

                if(!result.data.success){
                    const toastId = toast(
                        "Something went wrong",
                        {
                            description: result.data.message,
                            action: {
                                label: "Dismiss",
                                onClick: () => { toast.dismiss(toastId); }
                            }
                        }
                    )
                }

                else{
                    setUserData(result.data.response);
                    setNumberOfNotes(result.data.notesLength);
                }
            }
            catch(error: unknown){
                const toastId = toast(
                    "Something went wrong",
                    {
                        description: "Please try again",
                        action: {
                            label: "Dismiss",
                            onClick: () => { toast.dismiss(toastId); }
                        }
                    }
                )
            }
            finally{
                setLoader(false);
            }
        }

        getDetails();
    }, [])

    return (
        <section className="bg-[#FAF9EE] dark:bg-[#0f0f1a] min-h-screen transition-colors duration-500 mt-16">
            <Navbar />
            <div className="flex min-h-screen overflow-y-auto">
                <Sidebar />

                <div className="flex-1 flex flex-col items-center px-5 md:px-10 py-20">
                    {loader ? (
                        <div className="flex gap-3 items-center mt-40 text-xl font-semibold text-gray-800 dark:text-white">
                            Please wait <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                    ) : userData && (
                        <>
                            {/* Profile Header */}
                            <div className="w-full max-w-4xl flex flex-col items-center bg-white dark:bg-[#1b1b28] rounded-3xl shadow-xl p-6 md:p-10 mb-10 transition-all duration-500">
                                <div className="flex flex-col items-center">
                                    <div className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-green-600 dark:border-green-400 overflow-hidden mb-4">
                                        <img
                                            src={userData?.image 
                                                ? userData.image 
                                                : `https://api.dicebear.com/9.x/adventurer/svg?seed=${userData?.username}`}
                                            alt="profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                        {userData?.username}
                                    </h2>
                                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 italic">
                                        {userData?.email}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4 mt-4">
                                        <Link
                                            href="/update-profile"
                                            className="px-5 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300"
                                        >
                                            Edit Profile
                                        </Link>
                                        <Link
                                            href="/upload-notes"
                                            className="px-5 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                                        >
                                            Upload Notes
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* About & Personal Details */}
                            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* About */}
                                <div className="bg-white dark:bg-[#1b1b28] rounded-2xl shadow-lg p-6 flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">About</h2>
                                        <Link
                                            href="/update-profile"
                                            className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold hover:underline"
                                        >
                                            Edit <Edit className="w-4 h-4" />
                                        </Link>
                                    </div>
                                    <div className="h-[1px] w-20 bg-gray-300 dark:bg-gray-600 mb-4"></div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        {(userData.userDetails as Profile).about 
                                            ? (userData.userDetails as Profile).about 
                                            : "Write something about Yourself"}
                                    </p>
                                </div>

                                {/* Personal Details */}
                                <div className="bg-white dark:bg-[#1b1b28] rounded-2xl shadow-lg p-6 flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Details</h2>
                                        <Link
                                            href="/update-profile"
                                            className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold hover:underline"
                                        >
                                            Edit <Edit className="w-4 h-4" />
                                        </Link>
                                    </div>
                                    <div className="h-[1px] w-24 bg-gray-300 dark:bg-gray-600 mb-4"></div>

                                    <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
                                        <div className="flex flex-col gap-2">
                                            <p className="font-semibold text-gray-700 dark:text-green-400">First Name</p>
                                            <p className="text-gray-600 dark:text-gray-300">{(userData.userDetails as Profile).firstName || "Not provided"}</p>

                                            <p className="font-semibold text-gray-700 dark:text-green-400">Gender</p>
                                            <p className="text-gray-600 dark:text-gray-300">{(userData.userDetails as Profile).gender || "Not provided"}</p>

                                            <p className="font-semibold text-gray-700 dark:text-green-400">Notes Uploaded</p>
                                            <p className="text-gray-600 dark:text-gray-300">{numberOfNotes}</p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <p className="font-semibold text-gray-700 dark:text-green-400">Last Name</p>
                                            <p className="text-gray-600 dark:text-gray-300">{(userData.userDetails as Profile).lastName || "Not provided"}</p>

                                            <p className="font-semibold text-gray-700 dark:text-green-400">Contact Number</p>
                                            <p className="text-gray-600 dark:text-gray-300">{(userData.userDetails as Profile).contactNumber || "Not provided"}</p>

                                            <p className="font-semibold text-gray-700 dark:text-green-400">Date of Birth</p>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {(userData.userDetails as Profile).dateOfBirth 
                                                    ? new Date((userData.userDetails as Profile).dateOfBirth).toLocaleDateString("en-GB", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    })
                                                    : "Not provided"
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </section>
    )
}
