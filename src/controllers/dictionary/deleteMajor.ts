import { Response, Request } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { ObjectId } from "mongoose";
import { DictionaryModel } from "../../models/Dictionary";
export const deleteMajor = async (
  req: Request<any, any, any, { id: ObjectId; groupId: ObjectId }>,
  res: Response
) => {
  try {
    const { id, groupId } = req.query;
    const updatedDictionary = await DictionaryModel.findByIdAndUpdate(
      groupId,
      {
        $pull: { majors: { _id: id } },
      },
      { new: true }
    );
    if (!updatedDictionary) {
      return res.send(
        ErrorUtils.get("DICTIONARY_ID_OR_ENTRY_ID_DELETE_NOT_FOUND")
      );
    }
    return res.send({ code: 200 });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
