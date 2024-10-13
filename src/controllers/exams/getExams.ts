import { Response, Request, query } from "express";
import { ExamModel } from "../../models/Exam";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import { IExamREQ, IExamResponse } from "../../utils/interfaces";
import { EExamCategory } from "../../utils/enums/exam.enum";
import { TPagingParams, TResponseWithPagination } from "../../utils/types/meta";

export const getExams = async (
  req: Request<any, any, any, IExamREQ & TPagingParams>,
  res: Response<TResponseWithPagination<IExamResponse> | IErrorData>
) => {
  try {
    const {
      category = EExamCategory.SYSTEM,
      size = 10,
      page = 1,
      direction = -1,
      ...queries
    } = req.query;

    const exams = await ExamModel.find({ category, ...queries })
      .sort({ createdAt: direction === 1 ? 1 : -1 })
      .skip((+page - 1) * +size)
      .limit(size)
      .exec();

    const totalCounts = await ExamModel.countDocuments({
      category,
      ...queries,
    });

    return res.send({
      code: 200,
      data: exams,
      message: "Success",
      pagination: {
        size: +size,
        page: +page,
        totalCounts: totalCounts || 0,
        totalPages: Math.ceil(totalCounts / size),
      },
    });
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
