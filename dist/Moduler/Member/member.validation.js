"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberUpdateSchema = void 0;
const zod_1 = require("zod");
exports.memberUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
