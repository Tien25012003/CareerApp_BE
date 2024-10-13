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
  deviceId?: string;
};
export const login = async (
  req: Request<any, any, TBody>,
  res: Response<TResponse<Partial<IAccount>>>
) => {
  const { username, password, deviceId } = req.body;

  const account = await AccountModel.findOne({
    $or: [
      {
        username,
      },
      { deviceId },
    ],
  });
  // Check if account exists
  if (!account) {
    if (username)
      return res.status(401).send(ErrorUtils.get("INVALID_USERNAME_PASSWORD"));
    else {
      return res.status(200).send({
        code: 200,
        message: "Đăng nhập thành công",
        data: {
          name: "",
          role: "",
          email: "",
          groups: [],
          permissions: [],
          accessToken: "",
        },
      });
    }
  }

  // Ensure account.password is defined before calling bcrypt.compare
  const isPasswordValid =
    account.password && (await bcrypt.compare(password, account.password));
  if (isPasswordValid) {
    if (account.status === 1) {
      const token = generateToken(account.id);
      res.status(200).send({
        code: 200,
        message: "Đăng nhập thành công",
        data: {
          id: account.id,
          name: account.name,
          role: account.role,
          email: account.email,
          groups: account.groups,
          permissions: account.permissions,
          accessToken: token ?? "",
        },
      });
    } else {
      res.status(400).send(ErrorUtils.get("UNVERIFY_EMAIL"));
    }
  } else {
    res.status(400).send(ErrorUtils.get("SERVER_ERROR"));
  }
};
