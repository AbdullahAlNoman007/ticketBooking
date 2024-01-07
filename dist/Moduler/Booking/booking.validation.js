"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const TbookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        journey: zod_1.z.string(),
        slot: zod_1.z
            .array(zod_1.z.string().refine((seat) => {
            const regexPattern = /^[A-Z][1-5]$/;
            return regexPattern.test(seat);
        }, {
            message: " You must give a validation string of Seat following this pattern 'A1 , A2, B3, H2' ",
        }))
            .refine((arr) => {
            if (arr.length > 4) {
                throw new Error('You cannot book more than 4 seats');
            }
            return true;
        }),
    }),
});
const TbookingUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldSeat: zod_1.z
            .array(zod_1.z.string().refine((seat) => {
            const regexPattern = /^[A-Z][1-5]$/;
            return regexPattern.test(seat);
        }, {
            message: " You must give a validation string of Seat following this pattern 'A1 , A2, B3, H2' ",
        }))
            .refine((arr) => {
            if (arr.length > 4) {
                throw new Error('You cannot book more than 4 seats');
            }
            return true;
        }),
        newSeat: zod_1.z
            .array(zod_1.z.string().refine((seat) => {
            const regexPattern = /^[A-Z][1-5]$/;
            return regexPattern.test(seat);
        }, {
            message: " You must give a validation string of Seat following this pattern 'A1 , A2, B3, H2' ",
        }))
            .refine((arr) => {
            if (arr.length > 4) {
                throw new Error('You cannot book more than 4 seats');
            }
            return true;
        }),
    }),
});
exports.bookingValidation = {
    TbookingValidationSchema,
    TbookingUpdateSchema,
};
