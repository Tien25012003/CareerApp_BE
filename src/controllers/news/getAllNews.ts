import { Request, Response } from "express";
import { NewsModel } from "../../models/News";
import ErrorUtils from "../../utils/constant/Error";
import { TResponse } from "../../utils/types/meta";
type Image = {
  longImage: string;
  shortImage: string;
};

type NewsItem = {
  _id: string;
  createdAt: string;
  title: string;
  content: string;
  type: "BREAKING" | string; // Assuming other types could be added
  image: Image;
};
export const getAllNews = async (
  req: Request<any, any, any, any>,
  res: Response<TResponse<NewsItem[]>>
) => {
  try {
    const news = await NewsModel.find({});
    //console.log(news);
    res.send({
      code: 200,
      //@ts-expect-error no check
      data: news,
      message: "",
    });
  } catch (error) {
    res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
