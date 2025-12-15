import type { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode: number = 200,
  message: string,
  data?: any
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number = 500,
  message: string
) => {
  return res.status(statusCode).json({
    success: true,
    message,
  });
};
