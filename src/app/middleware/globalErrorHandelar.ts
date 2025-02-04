/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  
) => {
  const statusCode = 500;
  const message = err.message || 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err
  });
};

export default globalErrorHandler;