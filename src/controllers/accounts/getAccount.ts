import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";

export const getAccount = async (
  req: Request<any, any, any, { userId: string }>,
  res: Response
) => {
  try {
    const account = await AccountModel.findById(req.query.userId)
      .select("-password")
      .populate("groups", "_id");
    // Extract the group IDs as strings
    const groupIds = account?.groups.map((group) => group._id.toString());

    return res.send({
      code: 200,
      data: {
        ...account?.toObject(),
        groups: groupIds,
      },
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
