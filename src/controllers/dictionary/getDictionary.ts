import { DictionaryModel } from "../../models/Dictionary";
import { Request, Response } from "express";
import ErrorUtils from "../../utils/constant/Error";
export const getDictionary = async (req: Request, res: Response) => {
  try {
    const dictionary = await DictionaryModel.find({});
    return res.send({
      code: 200,
      data: dictionary,
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
