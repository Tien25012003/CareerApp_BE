import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getTokenFromHeader } from "../hooks/getTokenFromHeader";
import ErrorUtils from "../utils/constant/Error";
import { BlackListModel } from "../models/Blacklist";

// Middleware to check token validity
export const verifyToken = async (
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction
) => {
  const jwtSecretKey = "25012003";

  const token = getTokenFromHeader(req);

  if (!token) return res.status(404).send(ErrorUtils.get("INVALID_TOKEN"));
  const blacklist = await BlackListModel.findOne({ token: token });
  if (blacklist) return res.status(404).send(ErrorUtils.get("INVALID_TOKEN"));
  try {
    const verified = JWT.verify(token, jwtSecretKey);
    console.log(verified);
    next();
  } catch (err) {
    await BlackListModel.deleteOne({ token: token });
    res.status(404).send(ErrorUtils.get("INVALID_TOKEN"));
  }
};
