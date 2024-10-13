import { Response, Request } from "express";
import { SubjectsModel } from "../../models/Subjects";
import ErrorUtils from "../../utils/constant/Error";
import { ISubject, ISubjectREQ } from "../../utils/interfaces/SchoolSubjects";
import { TPagingParams, TResponseWithPagination } from "../../utils/types/meta";
export const getSubjects = async (
  req: Request<any, any, any, ISubjectREQ & TPagingParams>,
  res: Response<TResponseWithPagination<ISubject[]>>
) => {
  try {
    const { size = 10, page = 1, direction = -1, ...queries } = req.query;

    const subjects = await SubjectsModel.find({ ...queries })
      .sort({
        createdAt: direction === 1 ? 1 : -1,
      })
      .skip((+page - 1) * +size)
      .limit(size)
      .exec();

    const totalCounts = await SubjectsModel.countDocuments({ ...queries });

    return res.send({
      code: 200,
      data: subjects,
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
