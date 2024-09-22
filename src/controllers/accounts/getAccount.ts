import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";

export const getAccount = async (
  req: Request<any, any, any, { id: number }>,
  res: Response
) => {
  try {
    const { id } = req.query;
    const account = await AccountModel.findById(id);
    return res.send({
      code: 200,
      data: account,
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
