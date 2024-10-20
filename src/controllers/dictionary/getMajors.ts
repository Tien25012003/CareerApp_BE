import { DictionaryModel } from "../../models/Dictionary";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import { IMajor, TGroup } from "../../utils/interfaces";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";
import { Response } from "express";

export const getMajors = async (
  req: TRequest<any, { group: TGroup } & TPagingParams>,
  res: Response<TResponseWithPagination<IMajor[]> | IErrorData>
) => {
  try {
    const { size = 10, page = 1, ...queries } = req.query;

    // Build filter query based on user role
    const filterQueries: any = {
      ...queries,
    };

    // Fetch dictionary based on filter queries
    const dictionary = await DictionaryModel.findOne(filterQueries);

    if (!dictionary) {
      return res.status(404).send(ErrorUtils.get("DATA_NOT_FOUND"));
    }

    // Extract majors from the dictionary and apply pagination
    const totalMajors = dictionary.majors.length;
    const paginatedMajors = dictionary.majors.slice(
      (page - 1) * size,
      page * size
    );

    return res.send({
      code: 200,
      data: paginatedMajors,
      message: "Success!",
      pagination: {
        size: +size,
        page: +page,
        totalCounts: totalMajors,
        totalPages: Math.ceil(totalMajors / +size),
      },
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
