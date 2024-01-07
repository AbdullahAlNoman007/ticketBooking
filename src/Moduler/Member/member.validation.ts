import { z } from 'zod';

export const memberUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    gender: z.string().optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
  }),
});
