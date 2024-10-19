import { ExamModel } from "../../models/Exam";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest, TResponse } from "../../utils/types/meta";
import { Response } from "express";

export const addExamToGroup = async (
  req: TRequest<{ groupId: number; examId: number }>,
  res: Response<TResponse<void>>
) => {
  try {
    const { groupId, examId } = req.body;

    // Check if the exam exists
    const updatedExam = await ExamModel.findByIdAndUpdate(
      examId,
      { $addToSet: { groupId: groupId } }, // $addToSet ensures the same examId is not added twice
      { new: true }
    );
    if (!updatedExam) {
      return res.send(ErrorUtils.get("EXAM_NOT_FOUND"));
    }

    // Add examId to the group’s exams array
    const updatedGroup = await GroupModel.findByIdAndUpdate(
      groupId,
      { $addToSet: { exams: examId } }, // $addToSet ensures the same examId is not added twice
      { new: true }
    );

    if (!updatedGroup) {
      return res.send(ErrorUtils.get("GROUP_NOT_FOUND"));
    }

    return res.send({
      code: 200,
      message: "Success!",
    });
  } catch (error) {
    console.log("error", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
