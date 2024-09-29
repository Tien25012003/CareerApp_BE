import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import bcrypt from "bcrypt";
import { generateToken } from "../../hooks/generateToken";
import { TResponse } from "../../utils/types/meta";
import ErrorUtils from "../../utils/constant/Error";
type TBody = {
  username: string;
  password: string;
  token: string;
};
export const login = async (
  req: Request<any, any, TBody>,
  res: Response<TResponse<TBody>>
) => {
  const { username, password } = req.body;
  const account = await AccountModel.findOne({
    username,
    password,
  });
  if (!account || !(await bcrypt.compare(password, account.password))) {
    return res.status(401).send(ErrorUtils.get("INVALID_USERNAME_PASSWORD"));
  }
  const token = generateToken(account.id);
  res.status(200).send({
    code: 200,
    message: "Đăng nhập thành công",
    data: {
      password,
      username,
      token: token ?? "",
    },
  });
};
