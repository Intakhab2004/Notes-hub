"use client"

import Navbar from "@/components/common/Navbar"
import Sidebar from "@/components/common/Sidebar"
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/models/User";
import { profileSchema } from "@/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDaysIcon, Image, Loader2, Upload } from "lucide-react"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/common/Footer";
import { toast } from "sonner";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { signOut } from "next-auth/react";



export default function UpdateProfile(){
    const [loader, setLoader] = useState(false);
    const [submitDetailsLoader, setSubmitDetailsLoader] = useState(false);
    const [submitImageLoader, setSubmitImageLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);

    const imageForm = useForm<{image: FileList}>();

    const detailsForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            gender: "",
            dateOfBirth: undefined,
            about: "",
            contactNumber: ""
        }
    })

    useEffect(() => {
        const getDetails = async() => {
            setLoader(true);

            try{
                const result = await axios.get("/api/user-profile");

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
                    setUserData(result.data.response);
                }
            }
            catch(error: unknown){
                if(error instanceof Error){
                    console.log("Something went wrong: ", error.message);
                }
                else{
                    console.log("An unknown error: ", error);
                }

                const toastId = toast(
                    "Something went wrong",
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

        getDetails();

    }, [setUserData])

    const onSubmitImage = async(data: {image: FileList}) => {
        try{
            setSubmitImageLoader(true);

            const file = data.image[0];
            const formData = new FormData();
            formData.append("image", file);

            const result = await axios.put("/api/update-profile", formData);

            if(!result.data.success){
                console.log("Something went wrong: ", result.data.message);
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
            }
        }
        catch(error: unknown){
            if(error instanceof Error){
                console.log("Something went wrong: ", error.message);
            }
            else{
                console.log("An unknown error: ", error);
            }

            const toastId = toast(
                "Something went wrong",
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
            setSubmitImageLoader(false);
        }
    }

    const onSubmitDetails = async(data: z.infer<typeof profileSchema>) => {
        try{
            setSubmitDetailsLoader(true);
            const result = await axios.post("/api/update-profile", data);

            if(!result.data.success){
                console.log("An error occured: ", result.data.errors);
                const toastId = toast(
                    "Something went wrong",
                    {
                        description: result.data.errors,
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
                setUserData(result.data);
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

                detailsForm.reset({
                    firstName: "",
                    lastName: "",
                    gender: "",
                    dateOfBirth: undefined,
                    about: "",
                    contactNumber: "",
                })
            }
        }
        catch(error: unknown){
            if(error instanceof Error){
                console.log("Something went wrong: ", error.message);
            }
            else{
                console.log("An unknown error: ", error);
            }

            const toastId = toast(
                "Something went wrong",
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
            setSubmitDetailsLoader(false);
        }
    }

    const handleAccountDelete = async() => {
        setDeleteLoader(true);
        try{
            const result = await axios.delete("/api/update-profile");
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
                setIsOpen(false);
                await signOut({callbackUrl: "/sign-in"});
            }
        }
        catch(error){
            if(error instanceof Error){
                console.log("Something went wrong: ", error.message);
            }
            else{
                console.log("An unknown error: ", error);
            }

            const toastId = toast(
                "Something went wrong",
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
            setDeleteLoader(false);
        }
    }


    return (
        <section>
            <Navbar />
            <div className="min-h-screen flex flex-1 pt-17 overflow-y-auto" id="app-scroll">
                <Sidebar />

                {/* Main Container */}
                <div className="min-h-full w-full flex flex-col items-center bg-gray-100 dark:bg-gradient-to-b from-[#02051d] to-[#1b1b28] transition-all">
                    {
                        loader ? (
                            <div className="flex gap-3 items-center mt-60 text-xl font-semibold">
								Please wait <Loader2 className="w-8 h-8 animate-spin" />
							</div>
                        )
                        :
                        (
                            <>
                                {/* Image upload */}
                                <div className="w-11/12 md:w-8/12 flex gap-6 md:gap-10 flex-wrap mt-10 md:mt-20">
                                    <div className="flex gap-6 md:gap-4 items-center w-full p-3 py-5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-md shadow-lg">
                                        <div>
                                            {
                                                previewURL ? (
                                                    <img
                                                        src={previewURL}
                                                        alt="profile-img"
                                                        className="w-24 h-24 md:w-32 md:h-32 border border-black dark:border-white rounded-full dark:bg-gradient-to-b dark:from-pink-500 dark:to-indigo-700 bg-gradient-to-b from-blue-500 to-gray-700"
                                                    />
                                                )
                                                :
                                                userData?.image ? (
                                                    <img
                                                        src={userData?.image}
                                                        alt="profile-img"
                                                        className="w-24 h-24 md:w-32 md:h-32 border border-black dark:border-white rounded-full dark:bg-gradient-to-b dark:from-pink-500 dark:to-indigo-700 bg-gradient-to-b from-blue-500 to-gray-700"
                                                    />
                                                )
                                                :
                                                (
                                                    <img
                                                        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${userData?.username}`}
                                                        alt="profile-img"
                                                        className="w-24 h-24 md:w-32 md:h-32 border border-black dark:border-white rounded-full dark:bg-gradient-to-b dark:from-pink-500 dark:to-indigo-700 bg-gradient-to-b from-blue-500 to-gray-700"
                                                    />
                                                ) 
                                            }
                                        </div>
                                        <div>
                                            <h1 className="text-base font-semibold mb-2">
                                                Change Profile Picture
                                            </h1>
                                            <div className="flex flex-col md:flex-row gap-1 md:gap-3 ">
                                                {/* Image Form */}
                                                <Form {...imageForm}>
                                                    <form onSubmit={imageForm.handleSubmit(onSubmitImage)}>
                                                        <FormField
                                                            control={imageForm.control}
                                                            name="image"
                                                            render={({ field: { onChange } }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={(e) => {
                                                                                const file = e.target.files?.[0];
                                                                                if(file){
                                                                                    onChange(e.target.files); // update form state
                                                                                    const previewUrl = URL.createObjectURL(file);
                                                                                    setPreviewURL(previewUrl);
                                                                                }
                                                                            }}
                                                                            className="hidden"
                                                                            id="image-upload"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <div className="flex items-center gap-2">
                                                            <label
                                                                htmlFor="image-upload"
                                                                className="flex gap-2 items-center justify-center px-3 py-[0.2rem] text-[0.9rem] font-medium border border-gray-500 rounded-sm cursor-pointer"
                                                            >
                                                                <Image className="w-5 h-5"/> Select
                                                            </label>
                                                            <button
                                                                type="submit"
                                                                className="flex gap-2 items-center justify-center px-3 py-[0.2rem] text-[0.9rem] font-medium border border-gray-500 rounded-sm cursor-pointer"
                                                            >
                                                                {
                                                                    submitImageLoader ? (
                                                                        <div className="flex justify-center items-center gap-2">
                                                                            <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                                                        </div>
                                                                    )
                                                                    :
                                                                    (
                                                                        <div className="flex justify-center items-center gap-2">
                                                                            <Upload className="w-5 h-5"/> Update
                                                                        </div>
                                                                    )
                                                                }
                                                            </button>
                                                        </div>
                                                    </form>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                                {/* Update details form */}
                                <div className="w-11/12 md:w-8/12 flex gap-6 md:gap-10 flex-wrap my-10 md:my-20">
                                    <div className="w-full py-10 px-3 md:px-6 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-md shadow-lg">
                                        <h2 className="text-2xl font-semibold mb-6">
                                            Update Personal Details
                                        </h2>
                                        <Form {...detailsForm}>
                                            <form onSubmit={detailsForm.handleSubmit(onSubmitDetails)}>
                                                <div className="flex flex-col md:flex-row gap-10 justify-between">
                                                    <div className="w-full md:w-2/5 space-y-4 md:space-y-7">
                                                        <FormField
                                                            control={detailsForm.control}
                                                            name="firstName"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>First Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input 
                                                                            placeholder="Enter your first name"
                                                                            {...field} 
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={detailsForm.control}
                                                            name="lastName"
                                                            render={({field}) => (
                                                                <FormItem className="block md:hidden space-y-1">
                                                                    <FormLabel>Last Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="Enter your last name"
                                                                            {...field} 
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={detailsForm.control}
                                                            name="gender"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Gender</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select gender" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="male">Male</SelectItem>
                                                                                <SelectItem value="female">Female</SelectItem>
                                                                                <SelectItem value="other">Other</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={detailsForm.control}
                                                            name="contactNumber"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Contact Number</FormLabel>
                                                                    <FormControl>
                                                                        <Input 
                                                                            placeholder="Enter your Contact Number"
                                                                            {...field} 
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={detailsForm.control}
                                                            name="about"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                        <FormLabel>About</FormLabel>
                                                                        <FormControl>
                                                                            <Textarea 
                                                                                placeholder="Write something about yourself" rows={3}
                                                                                className="w-full md:w-[44rem]"
                                                                                {...field} 
                                                                            />
                                                                        </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="w-full md:w-2/5 space-y-4 md:space-y-7">
                                                        <FormField
                                                            control={detailsForm.control}
                                                            name="lastName"
                                                            render={({field}) => (
                                                                <FormItem className="hidden md:block space-y-2">
                                                                    <FormLabel>Last Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="Enter your last name"
                                                                            {...field} 
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={detailsForm.control}
                                                            name="dateOfBirth"
                                                            render={({field}) => (
                                                                <FormItem className="flex flex-col -mt-6 md:mt-0">
                                                                    <FormLabel>Date of birth</FormLabel>
                                                                    <Popover>
                                                                        <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                variant={"outline"}
                                                                                className={cn(
                                                                                    "w-[240px] pl-3 text-left font-normal",
                                                                                    !field.value && "text-muted-foreground"
                                                                                )}
                                                                            >
                                                                                {
                                                                                    field.value ? (
                                                                                        format(field.value, "PPP")
                                                                                    ) 
                                                                                    : 
                                                                                    ( <span>Pick a date</span> )
                                                                                }
                                                                                <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                            </Button>
                                                                        </FormControl>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent className="w-auto p-0" align="start">
                                                                            <Calendar
                                                                                mode="single"
                                                                                selected={field.value ?? undefined}
                                                                                onSelect={field.onChange}
                                                                                disabled={(date) =>
                                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                                }
                                                                                captionLayout="dropdown"
                                                                            />
                                                                        </PopoverContent>
                                                                    </Popover>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="px-4 py-[0.25rem] mt-7 text-[0.9rem] dark:bg-gray-800 bg-gray-300 font-medium border border-gray-400 dark:border-gray-600 rounded-sm cursor-pointer"
                                                >
                                                    {
                                                        submitDetailsLoader ? (
                                                            <div className="flex justify-center items-center gap-2">
                                                                <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                                            </div>
                                                        )
                                                        :
                                                        ("Submit")
                                                    }
                                                </button>
                                            </form>
                                        </Form>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        !loader && (
                            <div className="w-11/12 md:w-8/12 p-3 py-6 md:p-8 flex items-start gap-6 md:gap-10 mb-16 bg-red-300 dark:bg-[#4b0000cf] border border-red-700 dark:border-red-600 rounded-sm">
                                <div className="p-3 bg-red-400 dark:bg-red-300 rounded-full">
                                    <RiDeleteBin6Line className="text-red-800 w-8 h-8"/>
                                </div>
                                <div className="md:w-3/4">
                                    <h1 className="text-[1.1rem] font-bold text-black dark:text-white mb-1">
                                        Delete Account
                                    </h1>
                                    <h3 className="text-[1.2rem] font-medium text-red-700 dark:text-red-200 mb-2">
                                        Would you like to delete account?
                                    </h3>
                                    <h3 className="text-base font-medium text-red-700 dark:text-red-200 mb-3">
                                        Deleting your account is permanent and will remove all your uploaded content permanently from the server.
                                    </h3>
                                    <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                                        <AlertDialogTrigger asChild>
                                            <button className="text-red-950 dark:text-black font-semibold italic cursor-pointer">
                                                I want to delete my account
                                            </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your
                                                    account and delete all of your content.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel disabled={deleteLoader}>Cancel</AlertDialogCancel>
                                                <AlertDialogAction 
                                                    onClick={async(event) => {
                                                        event.preventDefault();
                                                        await handleAccountDelete();
                                                    }} 
                                                    disabled={deleteLoader}
                                                >
                                                    {
                                                        deleteLoader ? (
                                                            <div className="flex items-center">
                                                                <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                                            </div>
                                                        )
                                                        :
                                                        "Continue"
                                                    }
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </section>
    )
}