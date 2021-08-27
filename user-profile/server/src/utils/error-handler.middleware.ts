import { ErrorRequestHandler } from "express";

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;

  return res.status(status).send({
    statusCode: status,
    error: "Internal Server Error",
    message: "Internal server error",
  });
};
