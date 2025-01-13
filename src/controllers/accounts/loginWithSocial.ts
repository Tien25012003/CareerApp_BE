import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { generateToken } from "../../hooks/generateToken";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { IAccount } from "../../utils/interfaces/Account";
import { TResponse } from "../../utils/types/meta";
type TBody = {
  email: string;
  name: string;
};
export const loginWithSocial = async (
  req: Request<any, any, TBody>,
  res: Response<TResponse<Partial<IAccount>>>
) => {
  const { email, name } = req.body;

  try {
    const account = await AccountModel.findOne({ email });
    console.log(req.body);

    if (!account) {
      console.log("Account not found, creating a new one...");
      const hashedPassword = await bcrypt.hash("25012003", 10);

      const newAccount = new AccountModel({
        email,
        groups: [],
        name,
        creatorId: new ObjectId("670b721daeef041c0a8ca7d5"), // Ensure correct field name and value
        creator: "21520112@gm.uit.edu.vn",
        role: "TEACHER",
        username: name,
        status: 1,
        permissions: [
          {
            code: "DASHBOARD",
            name: "Tổng quan",
            permission: {
              view: true,
              create: false,
              delete: false,
              edit: false,
            },
          },
          {
            code: "ACCOUNT",
            name: "Tài khoản",
            permission: {
              view: true,
              create: true,
              delete: true,
              edit: true,
            },
          },
          {
            code: "EXAM_SYSTEM",
            name: "Bài kiểm tra",
            permission: {
              view: false,
              create: false,
              delete: false,
              edit: false,
            },
          },
          {
            code: "EXAM_CUSTOM",
            name: "Bài kiểm tra tự thiết kế",
            permission: {
              view: true,
              create: true,
              delete: true,
              edit: true,
            },
          },
          {
            code: "NEWS",
            name: "Tin tức",
            permission: {
              view: false,
              create: false,
              delete: false,
              edit: false,
            },
          },
          {
            code: "CHATBOT",
            name: "Chat bot",
            permission: {
              view: true,
              create: true,
              delete: true,
              edit: true,
            },
          },
          {
            code: "LIBRARY",
            name: "Từ điển",
            permission: {
              view: false,
              create: false,
              delete: false,
              edit: false,
            },
          },
        ],
        password: hashedPassword,
      });

      await newAccount.save();
      const token = generateToken(newAccount.id);

      return res.status(200).send({
        code: 200,
        message: "Đăng nhập thành công",
        data: {
          id: newAccount.id,
          name: newAccount.name,
          role: newAccount.role,
          email: newAccount.email,
          groups: newAccount.groups,
          permissions: newAccount.permissions,
          accessToken: token ?? "",
        },
      });
    }

    if (account.status === 1) {
      const token = generateToken(account.id);
      return res.status(200).send({
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
      return res.status(401).json(ErrorUtils.get("UNVERIFY_EMAIL"));
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .send({ code: 500, message: "Internal server error" });
  }
};
