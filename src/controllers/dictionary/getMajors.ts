import { DictionaryModel } from "../../models/Dictionary";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import { IMajor, IResponse, TGroup } from "../../utils/interfaces";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";
import { Response } from "express";

export const getMajors = async (
  req: TRequest<any, IMajor & { group: TGroup } & TPagingParams>,
  res: Response<TResponseWithPagination<IMajor[]> | IErrorData>
) => {
  try {
    const { size = 10, page = 1, direction = -1, ...queries } = req.query;

    const majors = await DictionaryModel.find({ ...queries });
  } catch (e) {
    console.log("e", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
