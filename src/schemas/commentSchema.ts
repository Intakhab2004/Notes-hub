import { z } from "zod"

export const commentSchema = z.object({
    content: z.string()
                      .min(1, "Some text required")
                      .min(2, "Comment must be of atleast two characters")
})