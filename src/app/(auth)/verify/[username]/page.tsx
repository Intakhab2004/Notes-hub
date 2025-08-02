"use client"


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


const VerifyPage = () => {
    const [loader, setLoader] = useState(false);
    const params = useParams<{username: string}>();
    const router = useRouter();


    const form = useForm<z.infer <typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            otp: ""
        }
    })


    const onSubmit = async(data: z.infer<typeof verifySchema>) => {
        setLoader(true);
        try{
            const result = await axios.post("/api/verify-otp", {
                username: params.username,
                otp: data.otp
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
                const toastId = toast(
                    "Success",
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

                router.replace("/sign-in");
            }
        }
        catch(error: unknown){
            if(error instanceof Error){
                console.log("Something went wrong while otp verification: ", error.message);
            }
            else{
                console.log("An unknown error: ", error);
            }

            const toastId = toast(
                "Something went wrong while verifying otp",
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
        <section className="flex justify-center items-center min-h-screen px-2 bg-gray-100 dark:bg-gradient-to-b from-[#161516] to-[#01012e] transition-all">
            <div className="w-full max-w-md p-5 md:p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-[#1b1b31] dark:shadow-gray-500">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-400 text-transparent bg-clip-text 
                        dark:bg-gradient-to-r dark:from-blue-500 dark:to-white/90 dark:text-transparent dark:bg-clip-text tracking-tight mb-5 leading-none">
                        Verify Your Account
                    </h1>
                    <p className="mb-4 text-[1.1rem] font-semibold text-gray-600 dark:text-gray-200">
                        Enter the verification code sent to your email
                    </p>
                </div>

                {/* OTP form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="otp"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>6-digit OTP</FormLabel>
                                    <FormControl>
                                        <Input placeholder="XXXXXX" 
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
                </Form>
            </div>
        </section>
    )
}

export default VerifyPage;