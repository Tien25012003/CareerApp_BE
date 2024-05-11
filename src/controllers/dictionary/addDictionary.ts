import { DictionaryModel } from "../../models/Dictionary";
import ErrorUtils from "../../utils/constant/Error";
import { IDictionary, TGroup } from "../../utils/interfaces/Dictionary";
import { Request, Response } from "express";
import { addNewDictionary } from "./utils/addNewDictionary";
export const addDictionary = async (
  req: Request<any, any, IDictionary>,
  res: Response
) => {
  try {
    const { group, majors } = req.body;
    // const existedGroup = await DictionaryModel.findOne({ group });
    // if (existedGroup) {
    //   const updatedGroup = await DictionaryModel.findOneAndUpdate(
    //     { group: group },
    //     { $addToSet: { majors: { $each: majors } } },
    //     { new: true }
    //   );
    //   return res.send({
    //     code: 200,
    //     data: updatedGroup,
    //   });
    // } else {
    //   const newGroup = new DictionaryModel({
    //     group,
    //     majors,
    //   });
    //   await newGroup.save().then((savedGroup) => {
    //     return res.send({
    //       code: 200,
    //       data: savedGroup,
    //     });
    //   });
    // }
    await addNewDictionary(group, majors).then((savedGroup) => {
      console.log("saved", savedGroup);
      return res.send({ code: 200, data: savedGroup });
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
