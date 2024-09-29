import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";

type TParams = {
  id: number;
};
export const deleteAccount = async (
  req: Request<any, any, any, TParams>,
  res: Response
) => {
  try {
    const { id } = req.query;
    await AccountModel.findByIdAndDelete(id).then(() => {
      res.send({ code: 200 });
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
