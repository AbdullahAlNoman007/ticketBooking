import { Response } from 'express';

type data<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: object;
  data: T;
};

const sendRespone = <T>(res: Response, data: data<T>) => {
  if (data?.meta) {
    res.status(data?.statusCode).json({
      success: data?.success,
      statusCode: data?.statusCode,
      message: data?.message,
      meta: data?.meta,
      data: data?.data,
    });
  } else {
    res.status(data?.statusCode).json({
      success: data?.success,
      statusCode: data?.statusCode,
      message: data?.message,
      data: data?.data,
    });
  }
};
export default sendRespone;
