import { Response, Request } from "express";
import { NewCategoryModel } from "../../models/NewCategory";
import { NewsModel } from "../../models/News";
import ErrorUtils from "../../utils/constant/Error";
export const getNews = async (req: Request, res: Response) => {
  try {
    await NewCategoryModel.find({})
      .populate({ path: "listNews", model: NewsModel })
      .then((category) => res.status(200).json(category));
  } catch (e) {
    res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
