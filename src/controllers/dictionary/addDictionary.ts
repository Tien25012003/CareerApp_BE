import ErrorUtils from "../../utils/constant/Error";
import { IDictionary } from "../../utils/interfaces/Dictionary";
import { Request, Response } from "express";
import { addNewDictionary } from "./utils/addNewDictionary";
export const addDictionary = async (
  req: Request<any, any, IDictionary>,
  res: Response
) => {
  try {
    const { group, majors } = req.body;
    await addNewDictionary(group, majors).then((savedGroup) => {
      console.log("saved", savedGroup);
      return res.send({ code: 200, data: savedGroup });
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
