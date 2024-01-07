import { ZodError, ZodIssue } from 'zod';

const handleZodError = (err: ZodError) => {
  let errorMessage: string = '';
  err.issues.map((issue: ZodIssue) => {
    errorMessage += `${issue?.path[
      issue.path.length - 1
    ]}, ${issue?.message} | `;
  });
  const statusCode = 400;
  return {
    statusCode,
    errorMessage,
  };
};
export default handleZodError;
