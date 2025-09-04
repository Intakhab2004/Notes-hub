import z from "zod";

export const resetPasswordSchema = z.object({
    newPassword: z.string()
                          .min(6, {message: "Password must be of atleast 6 characters"})
                          .min(1, {message: "Password is required"}),

    confirmNewPassword: z.string()
                                .min(6, {message: "Password must be of atleast 6 characters"})
                                .min(1, {message: "Password is required"}),
})