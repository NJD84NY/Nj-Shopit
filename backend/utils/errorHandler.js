class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Create stack error trace property (optional)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
