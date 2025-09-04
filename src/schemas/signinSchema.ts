import { z } from "zod"

export const signInSchema = z.object({
    identifier: z.string().min(1, {message: "Email or Username is required"}),
    password: z.string().min(1, {message: "Password is required"})
})