"use client"

import { XIcon } from "lucide-react";
import { useState } from "react"
import { Input } from "../ui/input";

interface tagInputProps {
    value: string[],
    onChange: (val: string[]) => void
}

const tagColors = [
    "from-green-500 to-green-300",
    "from-blue-500 to-blue-300",
    "from-purple-500 to-purple-300",
    "from-yellow-400 to-yellow-200",
    "from-pink-500 to-pink-300",
]

export default function TagsInput({value, onChange}: tagInputProps){
    const [inputVal, setInputVal] = useState("");


    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && inputVal.trim() !== ""){
            e.preventDefault();
            
            if(!value.includes(inputVal.trim())){
                onChange([...value, inputVal.trim()]);
            }
            setInputVal("");
        }
    }

    const handleRemoveTag = (tag: string) => {
        onChange(value.filter((currentTag) => currentTag !== tag));
    }

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-3">
               {
                    value.map((tag, index) => {
                        const color = tagColors[index % tagColors.length]; // loop through colors
                        return (
                            <div
                                key={index}
                                className={`flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${color} text-white rounded-xl shadow-sm`}
                            >
                                <span className="text-sm">{tag}</span>
                                <XIcon
                                    className="h-4 w-4 cursor-pointer hover:text-red-500 transition-colors"
                                    onClick={() => handleRemoveTag(tag)}
                                />
                            </div>
                        )
                    })
                }
            </div>

            <div className="flex gap-2">
                <Input
                    placeholder="Add a tag..."
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="flex-1 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#12122a] text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-xl"
                />
                <button
                    type="button"
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
                    onClick={() => {
                        if(inputVal.trim() !== "" && !value.includes(inputVal.trim())) {
                            onChange([...value, inputVal.trim()]);
                            setInputVal("");
                        }
                    }}
                >
                    Add
                </button>
            </div>
        </div>
    )
}
