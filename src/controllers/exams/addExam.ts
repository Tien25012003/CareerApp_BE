import { Response, Request } from "express";
import { ExamModel } from "../../models/Exam";
import { IAddExamREQ } from "../../utils/interfaces/Exam";
import ErrorUtils from "../../utils/constant/Error";
import { AccountModel } from "../../models/Account";

export const addExam = async (
  req: Request<any, any, IAddExamREQ>,
  res: Response
) => {
  try {
    const { type, questions, results, name, category, status, creatorId } =
      req.body;
    const creator = await AccountModel.findById(creatorId);

    if (!!creator?.email) {
      const newExam = new ExamModel({
        type,
        questions,
        results,
        name,
        category,
        status,
        creator: creator?.email,
        updator: creator?.email,
        creatorId: creatorId,
      });
      await newExam.save().then((savedExam) => {
        return res.send({
          code: 200,
          data: savedExam,
        });
      });
    } else {
      return res.send(ErrorUtils.get("SERVER_ERROR"));
    }
  } catch (e) {
    console.log("e", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
