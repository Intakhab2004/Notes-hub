'use client';

import Navbar from '@/components/common/Navbar';
import React from 'react';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#01012e] transition-all">
      <Navbar />

      <div className="flex flex-1">
     
        <div className="bg-white dark:bg-[#1f1f2e] mt-13 p-4 rounded-lg w-56 shadow-md">
          <p className="text-black dark:text-white font-bold mb-4 cursor-pointer hover:underline "><Link href='/'>Home</Link></p>
          <p className="text-black dark:text-white font-bold mb-4 cursor-pointer hover:underline">My Notes</p>
          <p className="text-black dark:text-white font-bold cursor-pointer hover:underline"><Link href="/upload-notes">Upload Notes</Link></p>
        </div>

        <div className="flex-1 p-6 text-black dark:text-white mt-11  ">
          <h1 className="text-2xl font-semibold text-center ">Welcome to NotesHub Dashboard</h1>
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
