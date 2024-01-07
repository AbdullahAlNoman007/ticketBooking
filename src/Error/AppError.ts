class AppError extends Error {
  public statuCode: number;
  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statuCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default AppError;
