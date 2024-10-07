import { Request, Response } from "express";
import { TPagingParams, TPagingResponse } from "../../utils/types/meta";
import { IGroup } from "../../utils/interfaces/Group";
import { GroupModel } from "../../models/Group";

type TParams = {
  groupName: string;
  status: number; // 1: Active , 0: Deactive
  direction?: number; // -1: DESC, 1: ASC
};
export const getListGroups = async (
  req: Request<any, any, any, TParams & Partial<TPagingParams>>,
  res: Response<Partial<TPagingResponse<IGroup[]>>>
) => {
  try {
    const {
      groupName,
      status,
      direction = -1,
      page = 0,
      size = 10,
    } = req.query;
    let query: any = {};
    if (groupName) {
      const groupNamePattern = new RegExp(groupName, "i");
      query["$or"] = [{ groupName: groupNamePattern }];
    }
    if (status !== undefined) {
      query.status = status; // Add status to the query if provided
    }
    const groups = await GroupModel.find(query)
      .sort({ updatedAt: direction === 1 ? 1 : -1 })
      .skip(page * size)
      .limit(size)
      .exec();
    const countGroups = await GroupModel.countDocuments(query);
    return res.send({
      code: 200,
      data: groups,
      totalElements: countGroups,
    });
  } catch (error) {}
};
