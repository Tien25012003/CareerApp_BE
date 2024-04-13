import { Response, Request } from "express";
import { ExamModel } from "../../models/Exam";
import ErrorUtils from "../../utils/constant/Error";
import { ObjectId } from "mongoose";
import { TResponse } from "../../utils/types/meta";
export const deleteExam = async (
  req: Request<any, any, { id: ObjectId }>,
  res: Response<TResponse<any>>
) => {
  const { id } = req.query;
  try {
    const deletedExam = await ExamModel.deleteOne(ExamModel.findById(id));
    if (deletedExam.deletedCount === 0) {
      return res.send(ErrorUtils.get("EXAM_ID_DELETE_NOT_FOUND")!);
    }
    return res.send({
      code: 200,
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
