import mongoose from 'mongoose';

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400;

  let errorMessage: string = '';
  Object.entries(err.errors).forEach(([key, value]) => {
    if (value.name === 'ValidatorError') {
      errorMessage += `${value.path} is ${value.kind} | `;
    } else if (value.name === 'CastError') {
      const match = value?.stringValue.match(/"([^"]*)"/);
      const givenValue = match && match[1];
      errorMessage += `${value.path} is ${value.kind} but Given value is ${givenValue} | `;
    }
  });
  return {
    statusCode,
    errorMessage,
  };
};

export default handleValidationError;
