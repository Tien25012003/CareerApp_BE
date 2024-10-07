import { Request, Response } from "express";
import { IGroup } from "../../utils/interfaces/Group";
import { GroupModel } from "../../models/Group";
import { TPagingResponse } from "../../utils/types/meta";
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
    const group = await GroupModel.findById(id);
    return res.status(200).send({
      code: 200,
      data: group,
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
