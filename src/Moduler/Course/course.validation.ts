import { z } from "zod";

const TtagvalidationSchema = z.object({
    name: z.string(),
    isDeleted: z.boolean(),
});

const TdetailsvalidationSchema = z.object({
    level: z.string(),
    description: z.string(),
});

const TCoursevalidationSchema = z.object({
    body: z.object({
        title: z.string(),
        instructor: z.string(),
        categoryId: z.string(),
        price: z.number(),
        tags: z.array(TtagvalidationSchema),
        startDate: z.string(),
        endDate: z.string(),
        language: z.string(),
        provider: z.string(),
        durationInWeeks: z.number().optional(),
        details: TdetailsvalidationSchema,
    })
})

const TtagupdatevalidationSchema = z.object({
    name: z.string().optional(),
    isDeleted: z.boolean().optional(),
});

const TdetailsupdatevalidationSchema = z.object({
    level: z.string().optional(),
    description: z.string().optional(),
});

const TCourseupdatevalidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        instructor: z.string().optional(),
        categoryId: z.string().optional(),
        price: z.number().optional(),
        tags: z.array(TtagupdatevalidationSchema).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        language: z.string().optional(),
        provider: z.string().optional(),
        durationInWeeks: z.number().optional(),
        details: TdetailsupdatevalidationSchema.optional(),
    })
})

export const courseZodValidation = {
    TCoursevalidationSchema,
    TCourseupdatevalidationSchema
}
