class ErrorResponse extends Error {
  statusCode: number;
  
  constructor(message = "Server Error", statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
