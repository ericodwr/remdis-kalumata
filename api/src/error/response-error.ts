interface CustomError {
  status: number;
}

export default class ResponseError extends Error implements CustomError {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    // this.name = status.toString();
  }
}
