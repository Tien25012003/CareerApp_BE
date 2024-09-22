import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { IAccount } from "../../utils/interfaces/Account";

type TParams = {
  id: number;
};
export const updateAccount = async (
  req: Request<any, any, Omit<IAccount, "id" | "status">, TParams>,
  res: Response
) => {
  try {
    const { id } = req.query;
    await AccountModel.findByIdAndUpdate(id, {
      ...req.body,
    }).then((value) => {
      return res.send({ code: 200, data: value });
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
