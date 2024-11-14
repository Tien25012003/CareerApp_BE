import { Request, Response } from "express";
import { GroupModel } from "../../models/Group";
import { IGroup } from "../../utils/interfaces/Group";
import { TPagingParams, TResponseWithPagination } from "../../utils/types/meta";

type TParams = {
  groupName: string;
  status: number; // 1: Active , 0: Deactive
  direction?: number; // -1: DESC, 1: ASC
  page: number;
  size: number;
};
export const getListGroups = async (
  req: Request<any, any, any, TParams & Partial<TPagingParams>>,
  res: Response<Partial<TResponseWithPagination<IGroup[]>>>
) => {
  try {
    const {
      groupName,
      status,
      direction = -1,
      page = 1,
      size = 10,
    } = req.query;
    let query: any = {};
    if (groupName) {
      const groupNamePattern = new RegExp(groupName, "i");
      query["$or"] = [{ groupName: groupNamePattern }];
    }
    if (status !== undefined) {
      query.status = +status; // Add status to the query if provided
    }

    const groups = await GroupModel.find(query)
      .populate("members", "_id email name status")
      .populate("owner", "_id email name status")
      .sort({ updatedAt: +direction === 1 ? 1 : -1 })
      .skip((page - 1) * size)
      .limit(size)
      .exec();
    const countGroups = await GroupModel.countDocuments(query);
    return res.send({
      code: 200,
      data: groups,
      pagination: {
        size: +size,
        page: +(page - 1),
        totalCounts: countGroups,
        totalPages: Math.ceil(countGroups / +size),
      },
    });
  } catch (error) {}
};
