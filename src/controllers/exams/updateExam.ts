import { Response, Request } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { IExam } from "../../utils/interfaces/Exam";
import { ExamModel } from "../../models/Exam";
import { ObjectId } from "mongoose";
export const updateExam = async (
  req: Request<any, any, { updateExam: IExam }, { id: ObjectId }>,
  res: Response
) => {
  try {
    const { id } = req.query;
    const { updateExam } = req.body;

    await ExamModel.findByIdAndUpdate(id, updateExam).then((result) => {
      res.send({
        code: 200,
        data: result,
      });
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};