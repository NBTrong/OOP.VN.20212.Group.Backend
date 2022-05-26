import { NextFunction, Request, Response } from "express";
import errorLogger from "@n-loggers/errorLogger";
import HttpError, { InternalError } from "@n-errors/HttpError";

function errorMiddleware(
  error: HttpError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  errorLogger.error(
    JSON.stringify({
      body: request.body,
      path: request.path,
      query: request.query,
      message: error.message,
      stack: error.stack,
    })
  );
  const message =
    (process.env.APP_ENV == "dev" && error.stack) || error.message;
  const newError = {
    code: 500,
    message: message,
  };
  // if (error) {
  //   response.status(error.code).send(error.toJSON());
  // }
  // console.log(err.toJSON());
  response.status(500).send(newError);
}

export default errorMiddleware;
