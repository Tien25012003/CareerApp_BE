import { Response, Request } from "express";
import { ExamModel } from "../../models/Exam";
export const getExams = async (req: Request, res: Response) => {
  try {
    await ExamModel.find({}).then((exam) => res.status(200).json(exam));
  } catch (e) {
    console.log(e);
  }
};
