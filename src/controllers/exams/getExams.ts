import { Response, Request } from "express";
import { ExamModel } from "../../models/Exam";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import { IExamResponse } from "../../utils/interfaces";

export const getExams = async (
  req: Request,
  res: Response<IExamResponse | IErrorData>
) => {
  try {
    await ExamModel.find({}).then((exam) => {
      return res.send({
        code: 200,
        data: exam,
      });
    });
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
