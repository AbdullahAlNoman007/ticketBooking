"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string(),
        role: zod_1.z.string().optional()
    })
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    })
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string(),
        newPassword: zod_1.z.string(),
    })
});
exports.userValidation = {
    userValidationSchema,
    loginValidationSchema,
    changePasswordValidationSchema
};
