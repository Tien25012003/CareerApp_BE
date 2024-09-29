import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import bcrypt from "bcrypt";
import { generateToken } from "../../hooks/generateToken";
import { TResponse } from "../../utils/types/meta";
import ErrorUtils from "../../utils/constant/Error";
import { IAccount } from "../../utils/interfaces/Account";
type TBody = {
  username: string;
  password: string;
  token: string;
};
export const login = async (
  req: Request<any, any, TBody>,
  res: Response<TResponse<Partial<IAccount>>>
) => {
  const { username, password } = req.body;

  const account = await AccountModel.findOne({ username });

  // Check if account exists
  if (!account) {
    return res.status(401).send(ErrorUtils.get("INVALID_USERNAME_PASSWORD"));
  }

  // Ensure account.password is defined before calling bcrypt.compare
  const isPasswordValid =
    account.password && (await bcrypt.compare(password, account.password));
  if (isPasswordValid) {
    const token = generateToken(account.id);
    res.status(200).send({
      code: 200,
      message: "Đăng nhập thành công",
      data: {
        name: account.name,
        role: account.role,
        email: account.email,
        groups: account.groups,
        permissions: account.permissions,
        accessToken: token ?? "",
      },
    });
  }
};
