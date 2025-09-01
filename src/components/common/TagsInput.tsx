"use client"

import { XIcon } from "lucide-react";
import { useState } from "react"
import { Input } from "../ui/input";


interface tagInputProps {
    value: string[],
    onChange: (val: string[]) => void
}

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
            <div className="flex flex-wrap gap-2 mb-2">
                {
                    value.map((tag, index) => (
                        <div key={index} className="flex bg-white dark:bg-black rounded-sm border-1 border-black dark:border-white gap-2 px-1">
                            {tag}
                            <XIcon className="h-3 w-3 bg-red-600 my-[7px] cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                        </div>
                    ))
                }
            </div>
            <div className="flex gap-2">
                <Input
                    placeholder="Add a tag..."
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleAddTag}
                    onKeyUp={handleAddTag}
                />
                <button
                    type="button"
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                    onClick={() => {
                        if(inputVal.trim() !== "" && !value.includes(inputVal.trim())){
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