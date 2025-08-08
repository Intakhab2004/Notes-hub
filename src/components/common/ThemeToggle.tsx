"use client"

import { Moon } from "lucide-react"
import { Sun } from "lucide-react"
import { useTheme } from "next-themes"


export const ThemeToggle = () => {
    const {theme, setTheme} = useTheme();

    return(
        <div
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300">
            {
                theme === "light" ? (
                                        <Moon size={20} className="text-gray-800"/>
                                    ) :
                                    (
                                        <Sun size={20} className="text-yellow-300"/>
                                    )
            }
        </div>
    )
}