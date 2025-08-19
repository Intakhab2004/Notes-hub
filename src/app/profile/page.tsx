"use client"

import Navbar from "@/components/common/Navbar"
import Sidebar from "@/components/common/Sidebar"
import img4 from "@/assets/img4.jpg"
import img5 from "@/assets/img5.jpg"
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
                    console.log("An error occured: ", result.data.message);
                    const toastId = toast(
                        "Something went wrong",
                        {
                            description: result.data.message,
                            action: {
                                label: "Dismiss",
                                onClick: () => {
                                    toast.dismiss(toastId);
                                }
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
                if(error instanceof Error){
                    console.log("Something went wrong: ", error.message);
                }
                else{
                    console.log("An unknown error: ", error);
                }

                const toastId = toast(
                    "Something went wrong",
                    {
                        description: "Please try again",
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId);
                            }
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
        <section>
            <Navbar />

            <div className="min-h-screen flex flex-1 pt-17 overflow-y-auto">
                <Sidebar />

                {/* Main Container */}
                <div className="min-h-full w-full flex flex-col items-center bg-gray-100 dark:bg-gradient-to-b from-[#02051d] to-[#1b1b28] transition-all">
                    {
                        loader ? (
                            <div className="flex gap-3 items-center mt-60 text-xl font-semibold">
								Please wait <Loader2 className="w-8 h-8 animate-spin" />
							</div>
                        )
                        :
                        userData && (
                                <>
                                    <div className="w-full flex flex-col items-center">
                                        <img
                                            src={img4.src}
                                            alt="bg-img"
                                            className="h-48 w-full dark:hidden"
                                        />
                                        <img
                                            src={img5.src}
                                            alt="bg-img"
                                            className="h-48 w-full hidden dark:block"
                                        />

                                        <div className="-mt-20">
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${userData?.username}`}
                                                    alt="profile-img"
                                                    className="w-40 h-40 border border-black dark:border-white rounded-full dark:bg-gradient-to-b dark:from-pink-500 dark:to-indigo-700 bg-gradient-to-b from-blue-500 to-gray-700"
                                                />
                                                <h2 className="mt-1 text-xl md:text-2xl font-bold">
                                                    {userData?.username}
                                                </h2>
                                                <h3 className="-mt-1 text-base font-md text-gray-600 dark:text-gray-400 italic">
                                                    {userData?.email}
                                                </h3>
                                            </div>
                                            <div className="flex gap-3 justify-center mt-1">
                                                <Link
                                                    href="/update-profile"
                                                    className="px-4 py-[0.3rem] cursor-pointer font-semibold rounded-md text-blue-600 border-1 border-blue-400 
                                                    hover:bg-blue-600 hover:text-white hover:scale-105 dark:text-pink-600 dark:border-pink-300
                                                    dark:hover:bg-pink-500 dark:hover:text-white transition-all duration-500"
                                                >
                                                    Edit Profile
                                                </Link>
                                                <Link
                                                    href="/upload-notes"
                                                    className="px-4 py-[0.3rem] cursor-pointer font-semibold rounded-md text-pink-600 border-1 border-pink-500 
                                                    hover:bg-pink-500 hover:text-white hover:scale-105 dark:text-blue-600 dark:border-blue-400
                                                    dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-500"
                                                >
                                                    Upload Notes
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-11/12 md:w-9/12 flex gap-6 md:gap-10 flex-wrap mt-10 md:mt-20 ">
                                        {/* About */}
                                        <div className="w-full p-3 pb-8 bg-gray-200 dark:bg-gray-900 border dark:border-gray-700 rounded-md shadow-lg">
                                            <div className="w-full flex justify-between items-center">
                                                <h2 className="text-2xl font-semibold">
                                                    About
                                                </h2>
                                                <Link
                                                    href="/update-profile"
                                                    className="w-fit px-2 py-[2px] text-[1.1rem] font-medium text-black bg-yellow-300 flex gap-2 items-center border border-gray-400 rounded-sm"
                                                >
                                                    Edit <Edit className="w-5 h-5"/>
                                                </Link>
                                            </div>
                                            <div className="w-32 h-[1px] mb-4 bg-gray-600 dark:text-gray-400"></div>
                                            <p className="text-[0.9rem] text-gray-600">
                                                {
                                                    (userData.userDetails as Profile).about ? (userData.userDetails as Profile).about : "Write something about Yourself"
                                                }
                                            </p>
                                        </div>

                                        {/* Personal Details */}
                                        <div className="w-full p-3 md:p-4 py-8 mb-20 bg-gray-200 dark:bg-gray-900 border dark:border-gray-700 rounded-md shadow-lg">
                                            <div className="w-full flex justify-between items-center">
                                                <h2 className="text-2xl font-semibold">
                                                    Personal Details
                                                </h2>
                                                <Link
                                                    href="/update-profile"
                                                    className="w-fit px-2 py-[2px] text-[1.1rem] font-medium text-black bg-yellow-300 flex gap-2 items-center border border-gray-400 rounded-sm"
                                                >
                                                    Edit <Edit className="w-5 h-5"/>
                                                </Link>
                                            </div>
                                            <div className="w-44 md:w-56 h-[1px] mb-4 bg-gray-600"></div>

                                            <div className="flex justify-around gap-4 my-8">
                                                <div className="flex flex-col gap-4 ">
                                                    <div>
                                                        <h2 className="text-[0.9rem] dark:text-yellow-400 text-blue-700 font-semibold">First Name</h2>
                                                        <p className="text-[0.9rem] text-gray-600 dark:text-gray-400">
                                                            {(userData.userDetails as Profile).firstName ? (userData.userDetails as Profile).firstName : "Write your first name"}
                                                        </p>
                                                    </div>
                                                    
                                                    <div>
                                                        <h2 className="text-[0.9rem] dark:text-yellow-400 text-blue-700 font-semibold">Gender</h2>
                                                        <p className="text-[0.9rem] text-gray-600 dark:text-gray-400">
                                                            {(userData.userDetails as Profile).gender ? (userData.userDetails as Profile).gender : "Enter your gender"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h2 className="text-[0.9rem] dark:text-yellow-400 text-blue-700 font-semibold">Notes Uploaded</h2>
                                                        <p className="text-[0.9rem] text-gray-600 dark:text-gray-400">
                                                            {numberOfNotes}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h2 className="text-[0.9rem] dark:text-yellow-400 text-blue-700 font-semibold">Last Name</h2>
                                                        <p className="text-[0.9rem] text-gray-600 dark:text-gray-400">
                                                            {(userData.userDetails as Profile).lastName ? (userData.userDetails as Profile).lastName : "Write your last name"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h2 className="text-[0.9rem] dark:text-yellow-400 text-blue-700 font-semibold">Contact Number</h2>
                                                        <p className="text-[0.9rem] text-gray-600 dark:text-gray-400">
                                                            {(userData.userDetails as Profile).contactNumber ? (userData.userDetails as Profile).contactNumber : "Enter your phone number"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h2 className="text-[0.9rem] dark:text-yellow-400 text-blue-700 font-semibold">Date of Birth</h2>
                                                        <p className="text-[0.9rem] text-gray-600 dark:text-gray-400">
                                                            {(userData.userDetails as Profile).dateOfBirth ? (userData.userDetails as Profile).dateOfBirth : "Enter your date of birth"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                        )  
                    }
                </div>
            </div>
            <Footer />
        </section>
    )
}