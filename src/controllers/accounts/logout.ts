import { Request, Response } from "express";
import { getTokenFromHeader } from "../../hooks/getTokenFromHeader";
import ErrorUtils from "../../utils/constant/Error";

export const logout = async (req: Request, res: Response) => {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).send(ErrorUtils.get("INVALID_TOKEN"));
  return res.status(200);
};
