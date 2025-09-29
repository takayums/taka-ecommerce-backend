import { NextFunction, Request, Response } from "express";

export const successRespnse = (
  res: Response,
  message: String,
  data = null,
  status = 200
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: String,
  data: null = null,
  status: number = 400
) => {
  return res.status(status).json({
    success: false,
    message,
    data,
  });
};
