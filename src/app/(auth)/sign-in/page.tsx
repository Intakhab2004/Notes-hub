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

export default function SigninPage() {
    const [loader, setLoader] = useState(false);
    const [alertBox, setAlertBox] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setLoader(true);
        try {
            if (!data.identifier || !data.password) {
                const toastId = toast(
                    "Please fill all the details carefully",
                    {
                        description: "All fields are mandatory",
                        action: { label: "Dismiss", onClick: () => toast.dismiss(toastId) }
                    }
                )
                return;
            }

            const result = await signIn("credentials", {
                redirect: false,
                identifier: data.identifier,
                password: data.password
            })

            if (result?.error) {
                if (result.error === "Please verify your account before login") {
                    setAlertBox(true);
                } else {
                    const toastId = toast(
                        "Something went wrong",
                        { description: result.error, action: { label: "Dismiss", onClick: () => toast.dismiss(toastId) } }
                    )
                }
            }

            if (result?.url) {
                router.replace("/profile");
            }
        } catch (error) {
            console.log("An error occurred: ", error);
            const toastId = toast(
                "Something went wrong",
                { description: "Please try again", action: { label: "Dismiss", onClick: () => toast.dismiss(toastId) } }
            )
        } finally {
            setLoader(false);
        }
    }

    return (
        <section className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#FAF9EE] to-[#DCCFC0] dark:from-[#0f0f1a] dark:to-[#001f3f] transition-all">
            {alertBox && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur z-20 flex items-center justify-center">
                    <Alert variant="destructive" className="absolute z-50 w-full max-w-md p-4">
                        <div className="flex items-start gap-2">
                            <AlertCircleIcon className="mt-1" />
                            <div>
                                <AlertTitle>Please verify your email before login</AlertTitle>
                                <AlertDescription>
                                    You need to Sign up again to get the verification code.
                                    <button
                                        className="mt-2 px-4 py-2 rounded-lg font-semibold text-red-700 bg-red-200 hover:bg-red-300 transition"
                                        onClick={() => setAlertBox(false)}
                                    >
                                        Dismiss
                                    </button>
                                </AlertDescription>
                            </div>
                        </div>
                    </Alert>
                </div>
            )}

            <div className="w-full max-w-md p-8 md:p-10 space-y-8 bg-white rounded-3xl shadow-xl dark:bg-[#1b1b31] dark:shadow-black/50">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text dark:from-green-400 dark:to-green-200">
                        NotesHub
                    </h1>
                    <p className="mt-2 text-gray-700 dark:text-gray-300 font-medium">
                        A Smarter Way to Study and Share.
                    </p>
                </div>

                {/* Login Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Email / Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Email / Username"
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...field}
                                            className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#12122a] text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-xl"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <Link
                                        href="/forgot-password"
                                        className="text-right -mt-2 text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline" 
                                    >
                                        Forgot password?
                                    </Link>
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
                                loader ? 
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin"/> Please wait
                                        </> 
                                        : "Sign In"
                            }
                        </button>
                    </form>

                    <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
                        New to NotesHub?{' '}
                        <Link href="/sign-up" className="text-green-600 dark:text-green-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </Form>
            </div>
        </section>
    )
}