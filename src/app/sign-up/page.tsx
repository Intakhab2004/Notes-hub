"use client"

import { signupSchema } from "@/schemas/signupSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { useState } from "react";
import { useDebounceCallback } from 'usehooks-ts'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";


const SignupPage = () => {
    const [loader, setLoader] = useState(false);
    const [usernameCheckLoader, setUsernameCheckLoader] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");

    const debounce = useDebounceCallback(setUsername, 300);



    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })


    const submitHandler = async() => {

    }




    return (
        <section className="min-h-screen px-2 flex justify-center items-center bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#01012e]">
            <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-[#1b1b31] dark:shadow-gray-500">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-400 text-transparent bg-clip-text 
                        dark:bg-gradient-to-r dark:from-blue-500 dark:to-white/90 dark:text-transparent dark:bg-clip-text tracking-tight mb-5"
                    >
                        NotesHub
                    </h1>
                    <p className="mb-4 text-[1.1rem] font-semibold text-gray-200">
                        Sign up to start collaborating with your knowledge.
                    </p>
                </div>

                {/* Sign up form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Username" 
                                            {...field} 
                                            onChange={(e) => {
                                                field.onChange(e)
                                                debounce(e.target.value)
                                            }}
                                        />
                                    </FormControl>
                                    {
                                        usernameCheckLoader && <Loader2 className="animate-spin" />
                                    }
                                    {
                                        username && (
                                            <p className={`text-sm ${usernameMessage === "Username is available" ? "text-green-500" : "text-red-500"}`}>
                                                {usernameMessage}
                                            </p>
                                        )
                                    }
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="abc123@gamil.com" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 

                        <FormField
                            name="confirmPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Confirm Password"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 
                        
                    </form>
                </Form>

            </div>
        </section>
    )
}

export default SignupPage;