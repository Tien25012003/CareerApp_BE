import { Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest } from "../../utils/types/meta";

export const getAccount = async (req: TRequest<any>, res: Response) => {
  try {
    const account = await AccountModel.findById(req.userId).select("-password");
    return res.send({
      code: 200,
      data: account,
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
