import { AccountModel } from "../../models/Account";
import { ExamModel } from "../../models/Exam";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import { ERole } from "../../utils/enums/account.enum";
import { IExamList, IExamREQ } from "../../utils/interfaces";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";
import { Response } from "express";

export const getExamList = async (
  req: TRequest<any, IExamREQ & TPagingParams>,
  res: Response<TResponseWithPagination<IExamList[]> | IErrorData>
) => {
  try {
    const {
      size = 10,
      page = 1,
      direction = -1,
      category,
      name,
      ...queries
    } = req.query;

    const user = await AccountModel.findById(req.userId);
    if (!user) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));
    if (user.role === ERole.ANONYMOUS || user.role === ERole.ANONYMOUS)
      return res.send(ErrorUtils.get("PERMISSION_DENIED"));

    // Build filter query based on user role
    const filterQueries: any = {
      ...queries,
      ...(user.role !== ERole.TEACHER && { creatorId: req.userId }),
      ...(category ? { category } : category),
      ...(name && { name: { $regex: name, $options: "i" } }),
    };

    // Fetch exams with pagination and sorting
    const exams = await ExamModel.find(filterQueries)
      .select("-questions -results -groupId -creatorId")
      .sort({ createdAt: direction === 1 ? 1 : -1 })
      .skip((+page - 1) * +size)
      .limit(+size)
      .exec();

    // Get the total count of exams matching the query
    const totalCounts = await ExamModel.countDocuments(filterQueries);

    // Respond with data and pagination
    return res.send({
      code: 200,
      data: exams,
      message: "Success!",
      pagination: {
        size: +size,
        page: +page,
        totalCounts,
        totalPages: Math.ceil(totalCounts / +size),
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
