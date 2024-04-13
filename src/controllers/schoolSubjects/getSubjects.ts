import { Response, Request } from "express";
import { SubjectsModel } from "../../models/Subjects";
import ErrorUtils from "../../utils/constant/Error";
import { ISubject } from "../../utils/interfaces/SchoolSubjects";
import { TResponse } from "../../utils/types/meta";
export const getSubjects = async (
  req: Request,
  res: Response<TResponse<ISubject[]>>
) => {
  try {
    await SubjectsModel.find({}).then((subjects) => {
      return res.send({
        code: 200,
        data: subjects,
      });
    });
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
