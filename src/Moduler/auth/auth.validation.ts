import { z } from 'zod';

const logInvalidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
});
const forgetpasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!!!',
    }),
  }),
});
const resetpasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!!!',
    }),
    newpassword: z.string({
      required_error: 'Password is required!!!',
    }),
  }),
});

export const authValidation = {
  logInvalidationSchema,
  changePasswordValidationSchema,
  forgetpasswordValidationSchema,
  resetpasswordValidationSchema,
};
