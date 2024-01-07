"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const logInvalidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string(),
        newPassword: zod_1.z.string(),
    }),
});
const forgetpasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'User id is required!!!',
        }),
    }),
});
const resetpasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'User id is required!!!',
        }),
        newpassword: zod_1.z.string({
            required_error: 'Password is required!!!',
        }),
    }),
});
exports.authValidation = {
    logInvalidationSchema,
    changePasswordValidationSchema,
    forgetpasswordValidationSchema,
    resetpasswordValidationSchema,
};
