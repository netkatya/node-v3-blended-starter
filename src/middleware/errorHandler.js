import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  // If the error is an instance of HttpError, use its status and message
  if (error instanceof HttpError) {
    return res.status(error.status).json({
      message: error.message || error.name,
    });
  }

  // Other errors - log and send a generic 500 response(like inside errors)
  console.error(error);
  res.status(500).json({
    message: error.message,
  });
};
