import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
type TParams = {
  status?: number; // 1: active, 0: deactive
  name?: string;
  email?: string;
  direction?: number; //-1: DESC, 1:ASC
};
export const getListAccounts = async (
  req: Request<any, any, any, TParams>,
  res: Response
) => {
  try {
    const { email, name, status, direction = 1 } = req.query;
    await AccountModel.find({
      $or: [
        {
          email: `/${email}/i`,
        },
        {
          name: `/${name}/i`,
        },
        {
          status: status,
        },
      ],
    })
      .sort({ createdAt: direction ? 1 : -1 })
      .then((value) => {
        return res.send({ code: 200, data: value });
      });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
