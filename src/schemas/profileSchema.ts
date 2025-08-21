import z from "zod"

export const profileSchema = z.object({
    firstName: z.string()
                        .min(2, {message: "First name should be at least 2 characters"})
                        .max(20, {message: "First name should not be more than 20 characters"})
                        .trim()
                        .optional()
                        .or(z.literal("")),

    lastName: z.string()
                        .min(2, {message: "Last name should be at least 2 characters"})
                        .max(20, {message: "Last name should not be more than 20 characters"})
                        .trim()
                        .optional()
                        .or(z.literal("")),

    gender: z.string().optional(),
    dateOfBirth: z.date().nullable().optional(),

    about: z.string()
                    .min(10, {message: "Write about 10 characters long"})
                    .optional()
                    .or(z.literal("")),

    contactNumber: z.string()
                            .regex(/^\d{10}$/, { message: "Contact number must be 10 digits" })
                            .optional()
                            .or(z.literal(""))
})