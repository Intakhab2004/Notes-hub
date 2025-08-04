import { z } from "zod"

export const uploadNotesSchema = z.object({
    title: z.string()
                    .min(1, "Title of the note is required")
                    .min(2, "Tile must be of atleast 2 characters")
                    .max(20, "Title must not be of more than 20 characters"),

    description: z.string()
                    .min(1, "Description of the note is required")
                    .min(2, "Description must be of atleast 2 characters"),

    tags: z.array(z.string().min(1, "Tags is required")
                            .min(2, "Tags must be of atleast 2 characters"),).min(1, "Atlaest one tag is necessary"),

    subject: z.string()
                       .min(1, "Subject is required")
                       .min(2, "Subject must be of atleast 2 characters"),
                    
    file: z.any()
})
