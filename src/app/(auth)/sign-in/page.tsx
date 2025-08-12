"use client"

import { signInSchema } from "@/schemas/signinSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertCircleIcon, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export default function SigninPage(){
    const [loader, setLoader] = useState(false);
    const [alertBox, setAlertBox] = useState(false);
    const router = useRouter();




    const form = useForm<z.infer <typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    })



    const onSubmit = async(data: z.infer<typeof signInSchema>) => {
        setLoader(true);
        try{
            if(!data.identifier || !data.password){
                const toastId = toast(
                    "Please fill all the details carefully",
                    {
                        description: "All fields are mandatory",
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId);
                            }
                        }
                    }
                )
                return ;
            }

            const result = await signIn("credentials", {
                redirect: false,
                identifier: data.identifier,
                password: data.password
            })

            if(result?.error){
                if(result.error === "Please verify your account before login"){
                    setAlertBox(true);
                }
                else{
                    const toastId = toast(
                        "Something went wrong",
                        {
                            description: result.error,
                            action: {
                                label: "Dismiss",
                                onClick: () => {
                                    toast.dismiss(toastId);
                                }
                            }
                        }
                    )
                }
            }

            if(result?.url){
                console.log("NEW URL", result.url);
                router.replace("/dashboard");
            }
        }

        catch(error){
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
            {
                alertBox && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur z-20 flex items-center justify-center">
                        <Alert variant="destructive" className="absolute z-50 top-70 w-full max-w-md">
                            <AlertCircleIcon />
                            <AlertTitle>Please verify your email before login</AlertTitle>
                            <AlertDescription>
                                You need to Sign up again to get the verification code.
                                <button 
                                    className="flex items-center cursor-pointer mt-2 font-semibold border-1 rounded-md py-1 px-4 transition-all duration-300 border-red-400 text-red-500 bg-red-200"
                                    onClick={() => {setAlertBox(false)}}
                                >
                                    Dismiss
                                </button>
                            </AlertDescription>
                        </Alert>
                    </div>
                )
            }
            <div className="w-full max-w-lg p-5 md:p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-[#1b1b31] dark:shadow-gray-500">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-400 text-transparent bg-clip-text 
                        dark:bg-gradient-to-r dark:from-blue-500 dark:to-white/90 dark:text-transparent dark:bg-clip-text tracking-tight mb-5"
                    >
                        NotesHub
                    </h1>
                    <p className="mb-4 text-[1.1rem] font-semibold text-gray-600 dark:text-gray-200">
                        A Smarter Way to Study and Share.
                    </p>
                </div>

                {/* Login form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email / Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email / Username" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your Password" type="password"
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
                            New to NotesHub? {'  '}
                            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </section>
    )
}