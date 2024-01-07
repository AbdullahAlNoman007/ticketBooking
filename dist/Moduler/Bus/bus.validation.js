"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const TbusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        companyName: zod_1.z.string(),
        no: zod_1.z.string(),
        capacity: zod_1.z.number(),
        slot: zod_1.z.array(zod_1.z.string().refine((seat) => {
            const regexPattern = /^[A-Z][1-5]$/;
            return regexPattern.test(seat);
        }, {
            message: " You must give a validation string of Seat following this pattern 'A1 , A2, B3, H2' ",
        })),
    }),
});
exports.default = TbusValidationSchema;
