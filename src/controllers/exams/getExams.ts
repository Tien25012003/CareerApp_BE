import { Response, Request } from "express";
import { ExamModel } from "../../models/Exam";
import ErrorUtils from "../../utils/constant/Error";

export const getExams = async (req: Request, res: Response) => {
  try {
    //await ExamModel.find({}).then((exam) => res.status(200).json(exam));
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
