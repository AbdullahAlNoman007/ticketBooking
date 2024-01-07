import mongoose from 'mongoose';

const handleDuplicateError = (err: mongoose.Error.CastError) => {
  const statusCode = 400;
  const match = err.message.match(/"([^"]*)"/);
  const message = match && match[1];
  const errorMessage = `${message} already exists` || ' ';
  return {
    statusCode,
    errorMessage,
  };
};
export default handleDuplicateError;
