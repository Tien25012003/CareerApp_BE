import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
type TParams = {
  status: number;
  name: string;
  email: string;
};
export const getListAccounts = async (
  req: Request<any, any, any, TParams>,
  res: Response
) => {
  try {
    const { email, name, status } = req.query;
    await AccountModel.find({
      $or: [
        {
          email: `/${email}/i`,
        },
        {
          name: `/${name}/i`,
        },
      ],
      status: status,
    }).then((value) => {
      return res.send({ code: 200, data: value });
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
