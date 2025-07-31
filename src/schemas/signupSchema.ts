import { z } from "zod"

export const usernameSchema = z.string()
                                        .min(1, {message: "Username is required"})
                                        .min(2, {message: "Username must be of atleast 2 characters"})
                                        .max(20, {message: "Username must be no longer than 20 characters"})
                                        .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain any special characters")

export const signupSchema = z.object({
    username: usernameSchema,
    email: z.email({message: "Invalid email address"})
                  .min(1, {message: "Email is required"}),

    password: z.string()
                        .min(6, {message: "Password must be of atleast 6 characters"})
                        .min(1, {message: "Password is required"}),
    
    confirmPassword: z.string()
                                .min(6, {message: "Password must be of atleast 6 characters"})
                                .min(1, {message: "Password is required"}),
})