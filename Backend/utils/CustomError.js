//this is a custom err class to make the process of tracking errors easier
class CustomError extends Error {
  constructor(message, statusCode = 401, status = "error") {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
  }
}

export default CustomError;
