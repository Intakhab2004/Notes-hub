"use client"

import Navbar from "@/components/common/Navbar"
import img1 from "@/assets/img2.jpg"
import Image from "next/image"
import { ArrowBigRight, SquareArrowOutUpRightIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import AboutUs from "@/components/common/About"
import ContactUs from "@/components/common/Contact"
import Footer from "@/components/common/Footer"


const quickLinks = ["Challenges", "Mock Tests", "Quick Notes", "Core Subjects", "PYQs", "Articles"]


export default function Home(){
	const {data: session} = useSession();
	const router = useRouter();

	return (
		<section>
			<Navbar />

			{/* Background Image */}
			<div className="relative h-screen bg-gray-700 dark:bg-[#161516]">
				<Image 
					src={img1}
					fill={true}
					alt="backgroundImg"
					className="object-cover opacity-20 dark:opacity-30"
				/>
				<div className="absolute top-40 left-3 md:left-30 md:top-50">
					<h1 className="text-4xl md:text-5xl font-extrabold leading-9">
						Welcome to <span className="text-blue-400">NotesHub</span>
					</h1>
					<p className="mt-3 text-[1.1rem] md:text-2xl font-semibold italic text-white/90">
						Notes That Work as Hard as You Do.
					</p>

					<button
						onClick={() => session ? router.push("/dashboard") : router.push("/sign-in")}
						className="mt-8 md:mt-10 px-7 py-4 text-2xl font-bold flex items-center gap-2 rounded-md hover:scale-105 cursor-pointer text-blue-600 hover:bg-blue-400 hover:text-white
							bg-white/80 border-1 border-blue-500 transition-all duration-300"
					>
						Join to Collab 
						<SquareArrowOutUpRightIcon />
					</button>

					<div className="flex justify-center items-center gap-6 flex-wrap mt-8 ml-0 md:mt-25 md:ml-56">
						<div className="hidden p-6 md:flex flex-col items-center gap-1 rounded-xl border dark:border-[rgba(255,255,255,0.32)] hover:scale-105 transition-all duration-300">
							<h1 className="text-3xl font-semibold text-white">
								2 M+
							</h1>
							<p className="text-base font-normal text-gray-300">
								Subscriber on Youtube
							</p>
						</div>
						<div className="px-9 py-2 md:p-6 flex flex-col items-center gap-1 rounded-xl border dark:border-[rgba(255,255,255,0.32)] hover:scale-105 transition-all duration-300">
							<h1 className="text-3xl font-semibold text-white">
								10 K+
							</h1>
							<p className="text-base font-normal text-gray-300">
								Followers on Twitter
							</p>
						</div>
						<div className="px-6 py-2 md:p-6 flex flex-col items-center gap-1 rounded-xl border dark:border-[rgba(255,255,255,0.32)] hover:scale-105 transition-all duration-300">
							<h1 className="text-3xl font-semibold text-white">
								202 K+
							</h1>
							<p className="text-base font-normal text-gray-300">
								Followers on Instagram
							</p>
						</div>
						<div className="px-7 py-2 md:p-6 flex flex-col items-center gap-1 rounded-xl border dark:border-[rgba(255,255,255,0.32)] hover:scale-105 transition-all duration-300">
							<h1 className="text-3xl font-semibold text-white">
								102 K+
							</h1>
							<p className="text-base font-normal text-gray-300">
								Followers on LinkedIn
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full flex justify-center bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#01012e]">
				<div className="w-11/12 my-10 flex gap-12 md:gap-40 flex-wrap justify-center">
					<div className="w-full md:w-1/3 px-5 py-8">
						<h1 className="w-full mb-4 text-gray-700 dark:text-gray-50 text-center md:text-left text-[2rem] md:text-4xl font-bold leading-8">
							Crack the code to Success with NotesHub
						</h1>
						<p className="mb-4 text-[1rem] text-gray-400 font-semibold text-center md:text-left leading-5">
							Elevate your skills, solve problems, and unlock the world of learning possibilities.
						</p>
						<div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
							<button 
								onClick={() => router.push("/notes-collections")}
								className="px-5 py-3 text-xl font-semibold border text-white bg-indigo-400 hover:bg-indigo-500 border-gray-600 dark:border-white/50 rounded-4xl transition-all duration-300">
								View Notes
							</button>
							<button
								onClick={() => session ? router.push("/upload-notes") : router.push("/sign-in")}
								className="flex gap-3 items-center px-5 py-3 text-xl font-semibold border-1 text-white bg-black/80 hover:bg-black/90 border-red-600 dark:border-white/50 rounded-4xl">
								Collab
								<ArrowBigRight className="text-red-500" />
							</button>
						</div>

						<div className="mt-10 md:mt-20 py-4 text-xl font-semibold text-center border border-gray-700 dark:border-gray-50 text-white bg-black/90 rounded-4xl transition-all duration-300">
							10,000+ Happy Students
						</div>
					</div>
					
					<div className="w-full md:w-[40rem] py-9 flex flex-wrap gap-10 border-1 border-gray-800 dark:border-gray-200 md:border-none rounded-xl justify-center">
						{
							quickLinks.map((link, index) => (
								<div
									key={index}
									className="w-[80%] md:w-[45%] h-[4.5rem] bg-black dark:bg-gray-800 rounded-xl flex justify-center 
									items-center text-2xl font-bold text-white/90 border-1 border-transparent hover:bg-gray-800
									hover:dark:bg-gray-900 hover:border-red-500 hover:dark:border-white/70 transition-all duration-300"
								>
									{link}
								</div>
							))
						}
					</div>
				</div>
			</div>

			<AboutUs/>
			<ContactUs />
			<Footer />
		</section>
	)
}