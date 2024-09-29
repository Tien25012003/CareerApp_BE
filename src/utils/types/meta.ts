import { IErrorData } from "../constant/Error";

export type TResponse<TData> = {
  code: number | string | IErrorData;
  message?: string;
  data?: TData;
};

export type TPagingResponse<TData> = {
  code: number | string | IErrorData;
  message?: string;
  data?: TData;
  totalElements: number;
};

export type TPagingParams = {
  size: number;
  page: number;
};
