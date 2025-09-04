"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


const requiredSchema = z.object({
    email: z.email({message: "Invalid email address"})
                  .min(1, {message: "Email is required"}),
})

const forgotPasswordPage = () => {
    const [loader, setLoader] = useState(false);


    const form = useForm<z.infer<typeof requiredSchema>>({
        resolver: zodResolver(requiredSchema),
        defaultValues: {
            email: ""
        }
    })


    const submitHandler = async(data: z.infer<typeof requiredSchema>) => {
        setLoader(true);

        try{
            const result = await axios.post("/api/forgot-password", data);
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
                console.log("Reset link for password has sent successfully");
                const toastId = toast(
                    result.data.message,
                    {
                        description: "Please check your email",
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId);
                            }
                        }
                    }
                )

                form.reset({
                    email: ""
                })
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
        <section className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#FAF9EE] to-[#DCCFC0] dark:from-[#0f0f1a] dark:to-[#001f3f] transition-all">
            <div className="w-full max-w-md p-8 md:p-10 space-y-8 bg-white dark:bg-[#1b1b31] rounded-3xl shadow-xl dark:shadow-black/50">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text dark:from-green-400 dark:to-green-200">
                        NotesHub
                    </h1>
                    <p className="mt-2 text-gray-700 dark:text-gray-300 font-medium">
                        Enter your email to get the reset password link
                    </p>
                </div>

                {/* form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter registered email" 
                                            {...field}
                                            className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#12122a] text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-xl"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <button 
                            type="submit"
                            disabled={loader}
                            className="w-full flex justify-center items-center gap-2 py-3 text-lg font-semibold text-white rounded-xl 
                                bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 transition-all 
                                duration-300 shadow-md shadow-green-300/50"
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
                </Form>
            </div>
        </section>
    )
}

export default forgotPasswordPage;
