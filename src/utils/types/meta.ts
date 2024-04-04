import { IErrorData } from "../constant/Error";

export type TResponse<TData> = {
  code: number | string | IErrorData;
  message?: string;
  data?: TData;
};
