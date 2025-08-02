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
        <section className="min-h-screen px-2 flex justify-center items-center bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#01012e] transition-all">
            <div className="w-full max-w-lg p-5 md:p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-[#1b1b31] dark:shadow-gray-500">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-400 text-transparent bg-clip-text 
                        dark:bg-gradient-to-r dark:from-blue-500 dark:to-white/90 dark:text-transparent dark:bg-clip-text tracking-tight mb-5"
                    >
                        NotesHub
                    </h1>
                    <p className="mb-4 text-[1.1rem] font-semibold text-gray-600 dark:text-gray-200">
                        Sign up to start collaborating with your knowledge.
                    </p>
                </div>

                {/* Sign up form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-5">
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
                                        <Input type="password" placeholder="Create Password"
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

                        <button
                            type="submit"
                            disabled={loader}
                            className="flex items-center cursor-pointer font-semibold border-1 rounded-md py-1 px-4 hover:scale-105 transition-all duration-300 border-gray-400 text-black/90 bg-gradient-to-r from-blue-300 via-indigo-200 to-gray-100 shadow-sm shadow-blue-400"
                        >
                            {
                                loader ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                            </>
                                          ) : 
                                          ("Submit")
                            }
                        </button>
                    </form>

                    <div className="text-center mt-2">
                        <p>
                            Already a member?{' '}
                            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default SignupPage;