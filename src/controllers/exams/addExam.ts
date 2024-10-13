import { Response, Request } from "express";
import { ExamModel } from "../../models/Exam";
import { IExam } from "../../utils/interfaces/Exam";
import ErrorUtils from "../../utils/constant/Error";
import { AccountModel } from "../../models/Account";
import { TRequest } from "../../utils/types/meta";

export const addExam = async (req: TRequest<IExam>, res: Response) => {
  try {
    const { type, questions, results, name, category, status } = req.body;
    const creator = await AccountModel.findById(req.userId);

    if (!!creator?.id) {
      const newExam = new ExamModel({
        type,
        questions,
        results,
        name,
        category,
        status,
        creator: creator?.email,
        updator: creator?.email,
        creatorId: creator?.id,
      });
      await newExam.save().then((savedExam) => {
        return res.send({
          code: 200,
          data: savedExam,
        });
      });
    } else {
      return res.send(ErrorUtils.get("ACCOUNT_INVALID"));
    }
  } catch (e) {
    console.log("e", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
