import { Response } from "express";
import { SchoolDictionaryModel } from "../../models/SchoolDictionary";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import {
  IGetSchoolDictionaryRequest,
  ISchoolDictionary,
} from "../../utils/interfaces/SchoolDictionary";
import { TRequest, TResponse } from "../../utils/types/meta";
export const getListSchool = async (
  req: TRequest<any, IGetSchoolDictionaryRequest>,
  res: Response<TResponse<ISchoolDictionary | IErrorData>>
) => {
  try {
    const { schoolId } = req.query;
    const school = await SchoolDictionaryModel.findById(schoolId);

    // Respond with data and pagination
    return res.send({
      code: 200,
      data: school as unknown as any,
      message: "Success",
    });
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
