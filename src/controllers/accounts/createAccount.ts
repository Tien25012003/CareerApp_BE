import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { IAccount } from "../../utils/interfaces/Account";
type TBody = Partial<IAccount>;
export const createAccount = async (
  req: Request<any, any, TBody>,
  res: Response
) => {
  try {
    const data = req.body;
    const isExistAccount = await AccountModel.findOne({
      email: data.email,
    });
    if (!isExistAccount) {
      const newAccount = new AccountModel(data);
      await newAccount.save();
      return res.send({ code: 200 });
    }
    return res.status(404).send(ErrorUtils.get("DUPLICATE_EMAIL"));
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
