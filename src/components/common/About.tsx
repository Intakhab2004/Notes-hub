"use client"

export default function AboutUs() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9EE] dark:bg-[#0a0a1a] px-3 py-16 md:py-24 transition-colors duration-700">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 text-center text-gray-800 dark:text-white">
                About <span className="text-green-600 dark:text-green-400">Us</span>
            </h1>

            <div className="max-w-6xl w-full bg-gradient-to-tr from-[#DCCFC0] via-[#A2AF9B] to-[#EEEEEE] 
                    dark:from-[#001f3f] dark:via-[#250303] dark:to-[#003300] 
                    rounded-3xl shadow-2xl p-6 md:p-12 flex flex-col lg:flex-row gap-8 md:gap-12 border border-gray-200 dark:border-gray-700 
                    hover:shadow-xl hover:scale-[1.02] transition-all duration-700"
            >
                
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-green-400">
                        Hey, <span className="text-blue-600 dark:text-blue-400">There</span> 👋
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed md:leading-loose text-sm md:text-base">
                        <span className="font-semibold text-green-600 dark:text-green-400">NotesHub</span> is your all-in-one destination for sharing and discovering high-quality study resources. Built for <span className="font-semibold">students, educators, and lifelong learners</span>, the platform allows you to upload, download, and view study notes effortlessly.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed md:leading-loose text-sm md:text-base">
                        At its core, <span className="font-semibold text-green-600 dark:text-green-400">NotesHub</span> is more than just a storage space for notes — it is a collaborative learning environment. Users can connect, exchange knowledge, and contribute to a growing community of learners.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed md:leading-loose text-sm md:text-base">
                        Supports multiple file formats including <span className="font-semibold">handwritten notes, typed documents, and multimedia study aids</span>. With an intuitive interface and powerful search, finding the right resources is quick and easy.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed md:leading-loose text-sm md:text-base">
                        Our vision is to ensure no student is left without the resources they need. Each uploaded note contributes to an ever-growing library of knowledge, fostering collaboration and limitless learning.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                        <span className="bg-green-100 dark:bg-green-900/70 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-green-300 dark:border-green-800 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-400 transition-all duration-300">
                            Handwritten Notes
                        </span>
                        <span className="bg-blue-100 dark:bg-blue-900/70 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-blue-300 dark:border-blue-800 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400 transition-all duration-300">
                            Previous Year Questions
                        </span>
                        <span className="bg-red-100 dark:bg-red-900/70 text-red-800 dark:text-red-300 px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-red-300 dark:border-red-800 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-400 transition-all duration-300">
                            Test Series
                        </span>
                        <span className="bg-purple-100 dark:bg-purple-900/70 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-purple-300 dark:border-purple-800 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-400 transition-all duration-300">
                            Mock Tests
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
