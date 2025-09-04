"use client"

import { signupSchema } from "@/schemas/signupSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { useState, useEffect } from "react";
import { useDebounceCallback } from 'usehooks-ts'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios"
import { toast } from "sonner";
import { useRouter } from "next/navigation"


const SignupPage = () => {
    const [loader, setLoader] = useState(false);
    const [usernameCheckLoader, setUsernameCheckLoader] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const router = useRouter();

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

    //API call for unique username check
    useEffect(() => {
        const checkUsername = async() => {
            if(username){
                setUsernameCheckLoader(true);
                setUsernameMessage("");

                try{
                    const response = await axios.get(`/api/unique-username?username=${username}`);
                    setUsernameMessage(response.data.message);
                }
                catch(error){
                    console.log("Something went wrong while checking username: ", error);
                    setUsernameMessage("Error while cheking username");
                }
                finally{
                    setUsernameCheckLoader(false);
                }
            }
        }

        checkUsername();
    }, [username])


    const submitHandler = async(data: z.infer<typeof signupSchema>) => {
        setLoader(true);

        try{
            const result = await axios.post("/api/sign-up", data);
            if(!result.data.success){
                console.log("An error occured: ", result.data.message);
                const toastId = toast(
                    "Something went wrong",
                    {
                        description: result.data.message,
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId);
                            }
                        }
                    }
                )
            }

            else{
                const toastId = toast(
                    "Account created successfully",
                    {
                        description: result.data.message,
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId);
                            }
                        }
                    }
                )

                router.replace(`/verify/${username}`);
            }
        }
        catch(error: unknown){
            if(error instanceof Error){
                console.log("Something went wrong while signup: ", error.message);
            }
            else{
                console.log("An unknown error: ", error);
            }

            const toastId = toast(
                "Something went wrong while signing up",
                {
                    description: "Please try again",
                    action: {
                        label: "Dismiss",
                        onClick: () => {
                            toast.dismiss(toastId);
                        }
                    }
                }
            )
        }
        finally{
            setLoader(false);
        }
    }




    return (
        <section className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#FAF9EE] to-[#DCCFC0] dark:from-[#0f0f1a] dark:to-[#001f3f] transition-all">
            <div className="w-full max-w-md p-8 md:p-10 space-y-8 bg-white dark:bg-[#1b1b31] rounded-3xl shadow-xl dark:shadow-black/50">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text dark:from-green-400 dark:to-green-200">
                        NotesHub
                    </h1>
                    <p className="mt-2 text-gray-700 dark:text-gray-300 font-medium">
                        Sign up to start collaborating and learning with the community.
                    </p>
                </div>

                {/* Sign up form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
                        {/* Username */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Username</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter username" 
                                            {...field} 
                                            onChange={(e) => {
                                                field.onChange(e)
                                                debounce(e.target.value)
                                            }}
                                            className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#12122a] text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-xl"
                                        />
                                    </FormControl>
                                    {
                                        usernameCheckLoader && <Loader2 className="mt-1 h-5 w-5 animate-spin text-green-500" />
                                    }
                                    {
                                        username && (
                                            <p className={`mt-1 text-sm ${usernameMessage === "Username is available" ? "text-green-500" : "text-red-500"}`}>
                                                {usernameMessage}
                                            </p>
                                        )
                                    }
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="abc123@gmail.com" 
                                            {...field} 
                                            className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#12122a] text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-xl"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password & Confirm Password - Responsive Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="password" 
                                                placeholder="Create password"
                                                {...field} 
                                                className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#12122a] text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="password" 
                                                placeholder="Confirm password"
                                                {...field} 
                                                className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#12122a] text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loader}
                            className="w-full flex justify-center items-center gap-2 py-3 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 transition-all duration-300 shadow-md shadow-green-300/50"
                        >
                            {
                                loader ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                            </>
                                ) 
                                : 
                                ("Submit")
                            }
                        </button>
                    </form>

                    <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
                        Already a member?{' '}
                        <Link href="/sign-in" className="text-green-600 dark:text-green-400 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </Form>
            </div>
        </section>
    )
}

export default SignupPage;