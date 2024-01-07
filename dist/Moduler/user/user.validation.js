"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberValidationSchema = void 0;
const zod_1 = require("zod");
const gender = ['male', 'female'];
exports.MemberValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        user: zod_1.z.object({
            name: zod_1.z.string(),
            gender: zod_1.z.enum(gender),
            dateOfBirth: zod_1.z.string(),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
            address: zod_1.z.string(),
        }),
    }),
});
