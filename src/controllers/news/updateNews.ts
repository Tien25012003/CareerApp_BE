import { Request, Response } from "express";
import { INewsBodyReq, INewsUpdateReq } from "../../utils/interfaces/News";
import { NewsModel } from "../../models/News";
import ErrorUtils from "../../utils/constant/Error";

export const updateNews = async (req: Request, res: Response) => {
  const { id, ...data } = req.body as INewsUpdateReq;
  try {
    const news = await NewsModel.findByIdAndUpdate(id, {
      ...data,
    });
    res.send({
      ...ErrorUtils.get("UPDATE_SUCCESS"),
      data: news,
    });
  } catch (error) {
    res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
