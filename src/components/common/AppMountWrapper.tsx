"use client"

import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";


export default function AppMountWrapper({children}: {children: ReactNode}){
    const {status} = useSession();
    const [mounted, setMounted] = useState(false)
    
    // It is for checking the system's theme before mounting the UI.
    useEffect(() => {
        setMounted(true)
    }, [])
    
    if (!mounted || status === "loading"){
        return (
            <div className="h-screen w-screen flex flex-col justify-center items-center overflow-x-hidden overflow-y-hidden">
                <div className="flex flex-row gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                    <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                    <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                </div>
                <p className="text-2xl font-bold text-blue-700 mt-1">
                    Loading
                </p>
            </div>
        )
    }

    return <>{children}</>
}