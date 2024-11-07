import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { IAccount } from "../../utils/interfaces/Account";
import { TPagingParams, TResponseWithPagination } from "../../utils/types/meta";

type TParams = {
  status?: number; // 1: active, 0: deactive
  name?: string;
  email?: string;
  role?: string;
  direction?: number; // -1: DESC, 1: ASC
};

export const getListAccounts = async (
  req: Request<any, any, any, TParams & Partial<TPagingParams>>,
  res: Response<Partial<TResponseWithPagination<IAccount[]>>>
) => {
  try {
    const {
      email,
      name,
      role = "",
      status,
      direction = -1,
      page = 1,
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

    if (role) {
      const accounts = await AccountModel.find(query)
        .where({
          role: role || "",
        })
        .populate("groups", "_id groupName")
        .select("-password")
        .sort({ updatedAt: direction === 1 ? 1 : -1 })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

      const countAccounts = await AccountModel.countDocuments(query);
      return res.send({
        code: 200,
        data: accounts,
        pagination: {
          size: +size,
          page: +page,
          totalCounts: countAccounts,
          totalPages: Math.ceil(countAccounts / +size),
        },
      });
    } else {
      const accounts = await AccountModel.find(query)
        .select("-password")
        .populate("groups", "_id groupName")
        .sort({ updatedAt: direction === 1 ? 1 : -1 })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

      const countAccounts = await AccountModel.countDocuments(query);
      return res.send({
        code: 200,
        data: accounts,
        pagination: {
          size: +size,
          page: +page,
          totalCounts: countAccounts,
          totalPages: Math.ceil(countAccounts / +size),
        },
      });
    }
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
