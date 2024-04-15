import { Response, Request } from "express";
import { ExamModel } from "../../models/Exam";
import { IExam } from "../../utils/interfaces/Exam";
import ErrorUtils from "../../utils/constant/Error";

export const addExam = async (req: Request<any, any, IExam>, res: Response) => {
  try {
    const { type, questions, results } = req.body;
    const newExam = new ExamModel({
      type,
      questions,
      results,
    });
    await newExam.save().then((savedExam) => {
      return res.send({
        code: 200,
        data: savedExam,
      });
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
