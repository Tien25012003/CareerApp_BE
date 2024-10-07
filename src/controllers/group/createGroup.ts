import { Request, Response } from "express";
import { IGroup } from "../../utils/interfaces/Group";
import ErrorUtils from "../../utils/constant/Error";
import { GroupModel } from "../../models/Group";
import { AccountModel } from "../../models/Account";

type TBody = Partial<IGroup>;
export const createGroup = async (
  req: Request<any, any, TBody>,
  res: Response
) => {
  const data = req.body;
  console.log("create group", data);
  if (!data.groupName || !data.owner || data.members?.length === 0)
    return res.status(400).send(ErrorUtils.get("ERROR_INVALID"));

  const isValidOwner = await AccountModel.findById(data.owner);

  if (!isValidOwner)
    return res.status(400).send(ErrorUtils.get("ACCOUNT_INVALID"));

  if (isValidOwner.role === "STUDENT" || isValidOwner.role === "ANONYMOUS") {
    return res.status(400).send(ErrorUtils.get("INVALID_PERMISSION"));
  }
  const validUsers = await AccountModel.find({
    _id: {
      $in: data.members,
    },
  });
  if (validUsers.length !== data.members?.length)
    return res.status(400).send(ErrorUtils.get("ACCOUNT_INVALID"));

  const newGroup = new GroupModel({
    ...data,
    status: 1,
  });

  await newGroup.save();
  res.status(201).send({ code: 200 });
};
