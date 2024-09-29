import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { TPagingParams, TPagingResponse } from "../../utils/types/meta";
import { IAccount } from "../../utils/interfaces/Account";

type TParams = {
  status?: number; // 1: active, 0: deactive
  name?: string;
  email?: string;
  direction?: number; // -1: DESC, 1: ASC
};

export const getListAccounts = async (
  req: Request<any, any, any, TParams & Partial<TPagingParams>>,
  res: Response<Partial<TPagingResponse<IAccount[]>>>
) => {
  try {
    const {
      email,
      name,
      status,
      direction = -1,
      page = 0,
      size = 10,
    } = req.query;
    let query: any = {};
    if (email && name) {
      const emailPattern = new RegExp(email, "i");
      const namePattern = new RegExp(name, "i");

      query["$or"] = [{ email: emailPattern }, { name: namePattern }];
    } else {
      if (email) {
        const emailPattern = new RegExp(email, "i");
        query["$or"] = [{ email: emailPattern }];
      }
      if (name) {
        const namePattern = new RegExp(name, "i");
        query["$or"] = [{ name: namePattern }];
      }
    }

    if (status !== undefined) {
      query.status = status; // Add status to the query if provided
    }

    const accounts = await AccountModel.find(query)
      .select("-password")
      .sort({ updatedAt: direction === 1 ? 1 : -1 })
      .skip(page * size)
      .limit(size)
      .exec();
    const countAccounts = await AccountModel.countDocuments(query);
    return res.send({
      code: 200,
      data: accounts,
      totalElements: countAccounts,
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
