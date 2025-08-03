'use client'
import Navbar from '@/components/common/Navbar'
import Sidebar from '@/components/common/sidebar'
import React from 'react'

const Upload = () => {
    const handleFileChange=async  (e: React.ChangeEvent)=>{
        const file=e.target.file
        try{

        }
        catch(error){

        }
    }
  return (
     <div className="h-screen px-2 flex flex-col bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#01012e] transition-all">
      <Navbar />

      <div className="flex flex-1 pt-16 -ml-4">
        <Sidebar />
        <div className="flex-1 p-8 mt-4">
          <div className="bg-white dark:bg-[#2a2a3d] rounded-lg shadow-md p-8 w-full max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Upload Notes</h1>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload PDF/Doc
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-sm p-2 bg-white dark:bg-[#1f1f2e] border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                >
                  Upload
                </button>
              </div>
            </form>
            
          </div>
          </div>
      </div>
    </div>
  );
}

export default Upload;
