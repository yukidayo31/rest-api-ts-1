import { Response } from "express";

const response = (
  statusCode: number,
  data: any,
  message: String,
  res: Response
) => {
  res.json({
    statusCode: statusCode,
    data: data,
    message,
  });
};

export default response;
