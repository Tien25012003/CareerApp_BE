import { Response, Request } from "express";
import { ExamModel } from "../../models/Exam";
import ErrorUtils from "../../utils/constant/Error";
import { ObjectId } from "mongoose";
import { TRequest } from "../../utils/types/meta";
import { GroupModel } from "../../models/Group";
export const deleteExam = async (
  req: TRequest<any, { id: ObjectId }>,
  res: Response
) => {
  try {
    const { id } = req.query;
    // Corrected deleteOne query to pass the id directly
    const deletedExam = await ExamModel.deleteOne({ _id: id });

    if (deletedExam.deletedCount === 0) {
      return res.send(ErrorUtils.get("EXAM_ID_DELETE_NOT_FOUND")!);
    }

    // HANDLE FOREIGN KEYS

    // Pull the exam id from all groups that have it
    await GroupModel.updateMany({ exams: id }, { $pull: { exams: id } });

    return res.send({
      code: 200,
      message: "Success!",
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
