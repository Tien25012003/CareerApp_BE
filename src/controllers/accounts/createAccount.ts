import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { IAccount } from "../../utils/interfaces/Account";
import { sendVerifyEmail } from "../../hooks/sendVerifyEmail";
import bcrypt from "bcrypt";
type TBody = Partial<IAccount>;
export const createAccount = async (
  req: Request<any, any, TBody>,
  res: Response
) => {
  try {
    const data = req.body;

    if (!data.email) return res.status(400).send(ErrorUtils.get("EMPTY_EMAIL"));
    const isExisEmail = await AccountModel.findOne({
      email: data.email,
    });
    const isExistUserName = await AccountModel.findOne({
      username: data.username,
    });
    if (!isExisEmail && !isExistUserName) {
      if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newAccount = new AccountModel({
          ...data,
          status: 0,
          password: hashedPassword,
        });
        await newAccount.save();
        if (data.email)
          await sendVerifyEmail([data.email], newAccount.id, newAccount.name);
        return res.send({ code: 200 });
      }
    }
    if (isExisEmail)
      return res.status(400).send(ErrorUtils.get("DUPLICATE_EMAIL"));
    if (isExistUserName)
      return res.status(400).send(ErrorUtils.get("DUPLICATE_USER_NAME"));
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
