import { Request, Response } from "express";
import { getTokenFromHeader } from "../../hooks/getTokenFromHeader";
import ErrorUtils from "../../utils/constant/Error";
import JWT from "jsonwebtoken";
import { BlackListModel } from "../../models/Blacklist";
export const logout = async (req: Request, res: Response) => {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).send(ErrorUtils.get("INVALID_TOKEN"));
  const decoded = JWT.decode(token) as JWT.JwtPayload;
  const newBlacklist = new BlackListModel({
    ...decoded,
    token,
  });
  await newBlacklist.save();
  return res.status(200).send({
    code: 200,
    message: "Đăng xuất thành công",
  });
};
