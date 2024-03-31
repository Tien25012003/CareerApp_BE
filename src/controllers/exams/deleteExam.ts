import { Response, Request } from "express";
import { ExamModel } from "../../models/Exam";
import ErrorUtils from "../../utils/constant/Error";
import { ObjectId } from "mongoose";
export const deleteExam = async (
  req: Request<any, any, { id: ObjectId }>,
  res: Response
) => {
  const { id } = req.query;
  console.log(id);
  try {
    await ExamModel.deleteOne(ExamModel.findById(id)).then(async () => {
      await ExamModel.find({}).then((exam) => {
        return res.send({
          code: 200,
          data: exam,
        });
      });
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
