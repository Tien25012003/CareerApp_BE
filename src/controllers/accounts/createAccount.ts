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
    const isExisEmail = await AccountModel.findOne({
      email: data.email,
    });
    const isExistUserName = await AccountModel.findOne({
      username: data.username,
    });
    if (!isExisEmail && !isExistUserName) {
      const newAccount = new AccountModel(data);
      await newAccount.save();
      return res.send({ code: 200 });
    }
    if (isExisEmail)
      return res.status(404).send(ErrorUtils.get("DUPLICATE_EMAIL"));
    if (isExistUserName)
      return res.status(404).send(ErrorUtils.get("DUPLICATE_USER_NAME"));
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
