import { Request, Response } from "express";
import { NewsModel } from "../../models/News";
import { INewsBodyReq } from "../../utils/interfaces/News";
import { NewCategoryModel } from "../../models/NewCategory";
import ErrorUtils from "../../utils/constant/Error";

export const addNews = async (req: Request, res: Response) => {
  const { categoryName, createdAt, content, title, type, image } =
    req.body as INewsBodyReq;
  console.log(req.body);
  if (!categoryName || !content || !title || !type || !image) {
    res.send(ErrorUtils.get("ERROR_INVALID"));
    return;
  }
  try {
    const news = new NewsModel({
      createdAt: createdAt ?? new Date(),
      content,
      title,
      type,
      image,
    });
    await news.save();
    const newsCategory = await NewCategoryModel.findOne({
      categoryName: categoryName,
    });
    console.log(newsCategory);
    if (!!newsCategory) {
      newsCategory?.listNews.push(news.id);
      await newsCategory?.save();
      res.status(200).json(news);
    } else {
      await NewCategoryModel.create({
        categoryName: categoryName,
        listNews: [news.id],
      });
      res.status(200).json(news);
    }
  } catch (error) {
    res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
