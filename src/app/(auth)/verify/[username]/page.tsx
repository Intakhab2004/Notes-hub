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
        <section className="flex justify-center items-center min-h-screen px-4 bg-gradient-to-b from-[#FAF9EE] to-[#DCCFC0] dark:from-[#0f0f1a] dark:to-[#001f3f] transition-all">
            <div className="w-full max-w-md p-8 md:p-10 space-y-8 bg-white rounded-3xl shadow-xl dark:bg-[#1b1b31] dark:shadow-black/50">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text dark:from-green-400 dark:to-green-200 tracking-tight mb-3">
                        Verify Your Account
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                        Enter the 6-digit verification code sent to your email
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="otp"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">6-digit OTP</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="XXXXXX"
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
                            className="w-full flex justify-center items-center gap-2 py-3 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 transition-all duration-300 shadow-md shadow-green-300/50"
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