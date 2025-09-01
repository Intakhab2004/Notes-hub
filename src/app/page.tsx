"use client"

import Navbar from "@/components/common/Navbar"
import { ArrowBigRight, SquareArrowOutUpRightIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import AboutUs from "@/components/common/About"
import ContactUs from "@/components/common/Contact"
import Footer from "@/components/common/Footer"

const quickLinks = ["Challenges", "Mock Tests", "Quick Notes", "Core Subjects", "PYQs", "Articles"];

const features = [
	{ 
		title: "Structured Learning", 
		desc: "Organized notes and resources to maximize your learning." 
	},
	{ 
		title: "Practice & Mock Tests", 
		desc: "Enhance your problem-solving skills with exercises." 
	},
	{ 
		title: "Collaborative Platform", 
		desc: "Upload and share notes with a community of learners." 
	},
	{ 
		title: "Expert Resources", 
		desc: "Access curated materials from top educators." 
	}
]

const testimonials = [
	{ 
		name: "Alice Johnson", 
		feedback: "NotesHub made studying so much easier! Highly recommend.", 
		role: "Student"
	},
	{ 
		name: "Rohan Singh", 
		feedback: "I improved my scores significantly using NotesHub resources.", 
		role: "Student"
	},
	{ 
		name: "Priya Sharma", 
		feedback: "The collab feature is amazing for sharing notes and ideas.", 
		role: "Student"
	}
]

export default function Home() {
	const { data: session } = useSession()
	const router = useRouter()

	return (
		<section className="bg-[#FAF9EE] dark:bg-[#0f0f1a] transition-colors duration-500">
			<Navbar />

			{/* Hero Section */}
			<div className="w-full py-24 md:py-32 bg-gradient-to-r from-[#A2AF9B] via-[#DCCFC0] to-[#EEEEEE] dark:from-[#001f3f] 
				dark:via-[#2a2a2a] dark:to-[#3b0000] text-black dark:text-white rounded-b-3xl"
			>
				<div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-10">
					<div className="flex-1 text-center md:text-left">
						<h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
							Unlock Your Learning Potential with 
							<span className="text-green-600 dark:text-green-400"> NotesHub</span>
						</h1>
						<p className="mt-5 text-lg md:text-2xl font-medium text-gray-800 dark:text-gray-300">
							Master concepts, solve problems, and elevate your skills with curated notes and resources.
						</p>

						<div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
							<button
								onClick={() => router.push("/notes-collections")}
								className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-xl bg-green-600 hover:bg-green-700 text-white 
									transition-all duration-300"
							>
								Explore Notes <SquareArrowOutUpRightIcon />
							</button>

							<button
								onClick={() => session ? router.push("/upload-notes") : router.push("/sign-in")}
								className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-xl border-2 border-black 
									dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white 
									dark:hover:text-black transition-all duration-300"
							>
								Collab <ArrowBigRight />
							</button>
						</div>

						{/* Stats */}
						<div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
							<div className="p-4 rounded-xl bg-gray-200 dark:bg-[#1a1a2a] hover:shadow-lg transition-all duration-300">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">2M+</h2>
								<p className="text-sm text-gray-700 dark:text-gray-400 mt-1">YouTube Subscribers</p>
							</div>
							<div className="p-4 rounded-xl bg-gray-200 dark:bg-[#1a1a2a] hover:shadow-lg transition-all duration-300">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">10K+</h2>
								<p className="text-sm text-gray-700 dark:text-gray-400 mt-1">Twitter Followers</p>
							</div>
							<div className="p-4 rounded-xl bg-gray-200 dark:bg-[#1a1a2a] hover:shadow-lg transition-all duration-300">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">202K+</h2>
								<p className="text-sm text-gray-700 dark:text-gray-400 mt-1">Instagram Followers</p>
							</div>
							<div className="p-4 rounded-xl bg-gray-200 dark:bg-[#1a1a2a] hover:shadow-lg transition-all duration-300">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">102K+</h2>
								<p className="text-sm text-gray-700 dark:text-gray-400 mt-1">LinkedIn Followers</p>
							</div>
						</div>
					</div>

					{/* Quick Links / Features */}
					<div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-5">
						{
							quickLinks.map((link, index) => (
								<div
									key={index}
									className="py-6 rounded-xl text-center font-bold bg-gradient-to-tr from-[#DCCFC0] to-[#A2AF9B] 
										dark:from-[#001f3f] dark:to-[#3b0000] hover:opacity-90 transition-all duration-300 cursor-pointer 
										text-black dark:text-white"
								>
									{link}
								</div>
							))
						}
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="max-w-7xl mx-auto px-5 md:px-10 py-20">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
					Why Choose NotesHub
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{
						features.map((feature, index) => (
							<div key={index} className="p-6 rounded-xl bg-[#EEEEEE] dark:bg-[#001f3f] shadow-md hover:shadow-lg transition-all duration-300">
								<h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-green-400">
									{feature.title}
								</h3>
								<p className="text-gray-700 dark:text-gray-300">
									{feature.desc}
								</p>
							</div>
						))
					}
				</div>
			</div>

			{/* Popular Notes Section */}
			<div className="max-w-7xl mx-auto px-5 md:px-10 py-20 bg-[#DCCFC0] dark:bg-[#0a0a1a] rounded-t-3xl">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
					Popular Resources
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
					{
						[1, 2, 3, 4, 5, 6].map((note) => (
							<div key={note} className="p-6 rounded-xl bg-[#FAF9EE] dark:bg-[#001f3f] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
								<h3 className="font-bold text-lg text-gray-900 dark:text-green-400 mb-2">
									Notes Collection {note}
								</h3>
								<p className="text-gray-700 dark:text-gray-300 text-sm">
									High-quality notes to boost your exam preparation.
								</p>
							</div>

						))
					}
				</div>
			</div>

			{/* Testimonials Section */}
			<div className="max-w-7xl mx-auto px-5 md:px-10 py-20">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
					What Students Say
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{
						testimonials.map((t, index) => (
							<div key={index} className="p-6 rounded-xl bg-[#EEEEEE] dark:bg-[#001f3f] shadow-md hover:shadow-lg transition-all duration-300">
								<p className="text-gray-700 dark:text-gray-300 italic">
									{`"${t.feedback}"`}
								</p>
								<h4 className="mt-4 font-bold text-gray-900 dark:text-green-400">
									{t.name}
								</h4>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									{t.role}
								</p>
							</div>
						))
					}
				</div>
			</div>

			<div className="py-16 bg-gradient-to-r from-[#A2AF9B] to-[#DCCFC0] dark:from-[#001f3f] dark:to-[#3b0000] text-black 
				dark:text-white text-center rounded-3xl mx-5 md:mx-20 mb-16"
			>
				<h2 className="text-3xl md:text-5xl font-bold mb-4">
					Start Your Learning Journey Today
				</h2>
				<p className="text-lg md:text-2xl mb-6">
					Join thousands of learners and excel in your exams with NotesHub.
				</p>
				<button
					onClick={() => session ? router.push("/upload-notes") : router.push("/sign-in")}
					className="px-8 py-4 text-xl font-semibold rounded-xl bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
				>
					Join Now
				</button>
			</div>

			<AboutUs />
			<ContactUs />
			<Footer />
		</section>
	)
}