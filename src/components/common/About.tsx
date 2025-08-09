"use client"


export default function AboutUs(){
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#1b1a1a] px-4 py-16 md:py-24 transition-colors duration-700">
            <h1 className="text-4xl text-center sm:text-5xl md:text-6xl font-extrabold mb-8 leading-tight text-gray-800 dark:text-gray-100">
                About <span className="text-blue-500 dark:text-blue-400">Us</span>
            </h1>
            <div className="max-w-6xl w-full bg-white/80 dark:bg-[#111111]/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-12 
                    flex flex-col lg:flex-row items-center gap-8 md:gap-12 border border-gray-200 hover:shadow-xl hover:border-blue-200
                    dark:hover:border-purple-400 dark:border-white/70 transition-all duration-700 will-change-transform"
            >
                <div className="text-center lg:text-left flex-1">
                    <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                        Hey,{" "} 
                        <span className="text-blue-500 dark:text-blue-400">There</span> 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-2 leading-relaxed md:leading-loose text-sm md:text-base">
                        <span className="font-semibold text-blue-400">NotesHub</span> is your all-in-one destination for sharing 
                        and discovering high-quality study resources. Built for <span className="font-semibold">students, educators, 
                        and lifelong learners,</span> the platform allows you to upload, download, and view study notes with ease. 
                        Whether you're preparing for <span className="font-semibold">exams, working on assignments, or exploring new subjects, </span> 
                        NotesHub keeps your learning materials organized and accessible anytime, anywhere.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed md:leading-loose text-sm md:text-base">
                        At its core, <span className="font-semibold text-blue-400">NotesHub</span> is more than just a storage 
                        space for notes it's a collaborative learning environment. Users can connect with peers, exchange knowledge, 
                        and contribute to a growing community of learners. By enabling seamless sharing and feedback, the platform 
                        encourages active <span className="font-semibold">participation and a sense of belonging.</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed md:leading-loose text-sm md:text-base">
                        The platform supports multiple file formats, making it convenient to upload <span className="font-semibold">handwritten notes, typed 
                        documents, or even multimedia study aids.</span> With an intuitive interface and powerful search functionality, 
                        finding exactly what you need takes only seconds. Whether you're looking for a quick summary or an in-depth 
                        explanation, NotesHub puts the right resources at your fingertips.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed md:leading-loose text-sm md:text-base">
                        Our vision is to build a world where no student is left without the resources they need to succeed. Every 
                        uploaded note is a step toward that goal. Together, we can create an ever-growing library of learning, where 
                        knowledge is free-flowing, collaboration is effortless, and education is truly limitless.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                        <span className="bg-blue-100 dark:bg-blue-900/80 text-blue-700 dark:text-blue-300 px-4 py-2 
                            rounded-full text-xs md:text-sm font-medium border border-blue-200 dark:border-blue-800 hover:-translate-y-1
                            hover:shadow-lg hover:shadow-blue-400 transition-all duration-300"
                        >
                            HandWritten Notes
                        </span>
                        <span className="bg-green-100 dark:bg-green-900/80 text-green-700 dark:text-green-300 px-4 py-2 
                            rounded-full text-xs md:text-sm font-medium border border-green-200 dark:border-green-800 hover:-translate-y-1 
                            hover:shadow-lg hover:shadow-green-200 transition-all duration-300"
                        >
                            Previous Year Questions
                        </span>
                        <span className="bg-purple-100 dark:bg-purple-900/80 text-purple-700 dark:text-purple-300 px-4 py-2 
                            rounded-full text-xs md:text-sm font-medium border border-purple-200 dark:border-purple-800 hover:-translate-y-1 
                            hover:shadow-lg hover:shadow-purple-400 transition-all duration-300"
                        >
                            Test Series
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}