"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/schemas/resetPassSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";



const resetPasswordPage = () => {
    const [loader, setLoader] = useState(false);
    const params = useParams<{id: string}>();
    const router = useRouter();

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmNewPassword: ""
        }
    })


    const submitHandler = async(data: z.infer<typeof resetPasswordSchema>) => {
        if(data.newPassword !== data.confirmNewPassword){
            const toastId = toast(
                "Success",
                {
                    description: "New password and Confirm new password are not same",
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

        setLoader(true);
        try{
            const result = await axios.put("/api/forgot-password", {
                newPassword: data.newPassword,
                confirmNewPassword: data.confirmNewPassword,
                id: params.id
            })

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
                console.log("Password changed successfully");
                const toastId = toast(
                    "Success",
                    {
                        description: "Password changed successfully",
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId);
                            }
                        }
                    }
                )
                router.push("/sign-in");
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
                        Reset your password
                    </p>
                </div>

                {/* form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter new password" 
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
                            name="confirmNewPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Confirm New password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirm new password"
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

export default resetPasswordPage;
