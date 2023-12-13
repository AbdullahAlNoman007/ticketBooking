"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseZodValidation = void 0;
const zod_1 = require("zod");
const TtagvalidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    isDeleted: zod_1.z.boolean(),
});
const TdetailsvalidationSchema = zod_1.z.object({
    level: zod_1.z.string(),
    description: zod_1.z.string(),
});
const TCoursevalidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        instructor: zod_1.z.string(),
        categoryId: zod_1.z.string(),
        price: zod_1.z.number(),
        tags: zod_1.z.array(TtagvalidationSchema),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
        language: zod_1.z.string(),
        provider: zod_1.z.string(),
        durationInWeeks: zod_1.z.number().optional(),
        details: TdetailsvalidationSchema,
    })
});
const TtagupdatevalidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
const TdetailsupdatevalidationSchema = zod_1.z.object({
    level: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
const TCourseupdatevalidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        instructor: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        tags: zod_1.z.array(TtagupdatevalidationSchema).optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        language: zod_1.z.string().optional(),
        provider: zod_1.z.string().optional(),
        durationInWeeks: zod_1.z.number().optional(),
        details: TdetailsupdatevalidationSchema.optional(),
    })
});
exports.courseZodValidation = {
    TCoursevalidationSchema,
    TCourseupdatevalidationSchema
};
