import { z } from 'zod';

const TofferedJourneyValidationSchema = z.object({
  body: z
    .object({
      driver: z.string(),
      bus: z.string(),
      date: z.string().refine(
        (date) => {
          const regexPattern: RegExp =
            /^(?:20\d\d)-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/;
          return regexPattern.test(date);
        },
        {
          message:
            " You must give a validation string of Date following this pattern 'YYYY:MM:DD' ",
        },
      ),
      startTime: z.string().refine(
        (time) => {
          const regexPattern: RegExp = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return regexPattern.test(time);
        },
        {
          message:
            " You must give a validation string of Time following this pattern 'HH:MM' ",
        },
      ),
      endTime: z.string().refine(
        (time) => {
          const regexPattern: RegExp = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return regexPattern.test(time);
        },
        {
          message:
            " You must give a validation string of Time following this pattern 'HH:MM' ",
        },
      ),
    })
    .refine(
      (body) => {
        const start = new Date(`2001-05-04T${body.startTime}`);
        const end = new Date(`2001-05-04T${body.endTime}`);
        return end > start;
      },
      {
        message: 'End time must be after Start time!',
      },
    ),
});

export const offeredJourneyValidation = { TofferedJourneyValidationSchema };
