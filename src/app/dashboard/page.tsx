'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Link from 'next/link';
import axios from 'axios';
import Sidebar from '@/components/common/sidebar';
interface Note {
  _id: string;
  title: string;
  description: string;
  subject: string;
  tags:string[];
  fileUrl: string;
}

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('/api/user-notes');
        if (res.data.success) {
          setNotes(res.data.response);
        } else {
          console.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <section className="h-screen px-2 flex flex-col bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#01012e] transition-all">
      <Navbar />

      <div className="flex flex-1  pt-16 -ml-4 ">
        <Sidebar/>
        <main className="flex-1 p-6 text-black dark:text-white ">
          <h1 className="text-3xl font-semibold mb-6 text-center">📘 My Notes</h1>

          {loading ? (
            <p className="text-center text-gray-600 dark:text-gray-300">Loading your notes...</p>
          ) : notes.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300">No notes uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <div key={note._id} className="bg-white dark:bg-[#2c2c3f] p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{note.subject}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{note.description}</p>
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:underline"
                  >
                    View / Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
