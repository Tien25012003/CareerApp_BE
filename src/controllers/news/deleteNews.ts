import { Request, Response } from "express";
import { INewsReq } from "../../utils/interfaces/News";
import { NewsModel } from "../../models/News";
import { NewCategoryModel } from "../../models/NewCategory";

export const deleteNews = async (req: Request, res: Response) => {
  const { newsId, categoryName } = req.body as INewsReq;
  try {
    const newDetete = await NewsModel.deleteOne(NewsModel.findById(newsId));
    if (newDetete.deletedCount === 0) {
      res.status(404);
      return;
    }
    const news = (await NewsModel.find({})).map((map) => map.id);

    await NewCategoryModel.updateOne(
      {
        categoryName: categoryName,
      },
      {
        $set: {
          listNews: news,
        },
      }
    );
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
};
