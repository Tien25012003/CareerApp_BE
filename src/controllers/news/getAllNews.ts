import { Request, Response } from "express";
import { NewsModel } from "../../models/News";
import ErrorUtils from "../../utils/constant/Error";
import dayjs from "dayjs";
export const getAllNews = async (req: Request, res: Response) => {
  try {
    const news = await NewsModel.find({});
    //console.log(news);
    res.status(200).json(news);
  } catch (error) {
    res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
