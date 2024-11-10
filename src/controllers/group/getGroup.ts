import { Request, Response } from "express";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
type TParam = {
  id: string;
};
export const getGroup = async (
  req: Request<any, any, any, TParam>,
  res: Response
) => {
  const { id } = req.query;

  try {
    const group = await GroupModel.findById(id)
      .populate("owner", "_id name email status")
      .populate("members", "_id name email status");
    return res.status(200).send({
      code: 200,
      data: group,
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
