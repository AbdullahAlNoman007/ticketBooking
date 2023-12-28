import { z } from "zod";

const userValidationSchema = z.object({
    body: z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
        role: z.string().optional()
    })
})

const loginValidationSchema = z.object({
    body: z.object({
        username: z.string(),
        password: z.string(),
    })
})
const changePasswordValidationSchema = z.object({
    body: z.object({
        currentPassword: z.string(),
        newPassword: z.string(),
    })
})

export const userValidation = {
    userValidationSchema,
    loginValidationSchema,
    changePasswordValidationSchema
}