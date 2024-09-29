import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { IAccount } from "../../utils/interfaces/Account";
import { sendVerifyEmail } from "../../hooks/sendVerifyEmail";
type TBody = IAccount;
export const createAccount = async (
  req: Request<any, any, TBody>,
  res: Response
) => {
  try {
    const data = req.body;

    const newAccount = new AccountModel(data);
    const account = await newAccount.save();
    //await sendVerifyEmail([data.email]);
    console.log(account);
    return res.send({ code: 200 });
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
