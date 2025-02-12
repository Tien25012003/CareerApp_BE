import { Response } from "express";
import { Types } from "mongoose";
import { AccountModel } from "../../models/Account";
import { SubjectsModel } from "../../models/Subjects";
import ErrorUtils from "../../utils/constant/Error";
import { ERole } from "../../utils/enums/account.enum";
import { ISubject, ISubjectREQ } from "../../utils/interfaces/SchoolSubjects";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";
export const getSubjects = async (
  req: TRequest<any, ISubjectREQ & TPagingParams>,
  res: Response<TResponseWithPagination<ISubject[]>>
) => {
  try {
    const {
      size = 10,
      page = 1,
      direction = -1,
      vnName,
      name,
      ...queries
    } = req.query;

    // TEMPORARY
    if (!Types.ObjectId.isValid(req.userId as any)) {
      const subjects = await SubjectsModel.find({});
      return res.send({
        code: 200,
        data: subjects,
        message: "Success!",
        pagination: {
          size: 10,
          page: 1,
          totalCounts: 6,
          totalPages: 1,
        },
      });
    }
    ///

    const user = await AccountModel.findById(req.userId);
    if (!user) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));

    if (user?.role === ERole.STUDENT) {
      const subjects = await SubjectsModel.find({});
      return res.send({
        code: 200,
        data: subjects,
        message: "Success!",
        pagination: {
          size: 10,
          page: 1,
          totalCounts: 6,
          totalPages: 1,
        },
      });
    }

    const filterQueries: any = {
      ...queries,
      ...(user.role !== ERole.ADMIN &&
        user.role !== ERole.ANONYMOUS && { creatorId: req.userId }),
      ...(vnName && { vnName: { $regex: vnName, $options: "i" } }), // Search by vnName
      ...(name && { name: { $regex: name, $options: "i" } }),
    };

    const subjects = await SubjectsModel.find(filterQueries)
      .sort({
        createdAt: direction === 1 ? 1 : -1,
      })
      .skip((+page - 1) * +size)
      .limit(size)
      .exec();

    const totalCounts = await SubjectsModel.countDocuments(filterQueries);

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
