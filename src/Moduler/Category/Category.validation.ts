import { z } from "zod";

const CategoryValidationSchema = z.object({
    body: z.object({
        name: z.string()
    })
})
export default CategoryValidationSchema