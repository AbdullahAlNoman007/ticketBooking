import { z } from 'zod';

const TbusValidationSchema = z.object({
  body: z.object({
    companyName: z.string(),
    no: z.string(),
    capacity: z.number(),
    slot: z.array(
      z.string().refine(
        (seat) => {
          const regexPattern: RegExp = /^[A-Z][1-5]$/;
          return regexPattern.test(seat);
        },
        {
          message:
            " You must give a validation string of Seat following this pattern 'A1 , A2, B3, H2' ",
        },
      ),
    ),
  }),
});

export default TbusValidationSchema;
