import { DictionaryModel } from "../../../models/Dictionary";
import { IMajor, TGroup } from "../../../utils/interfaces/Dictionary";

const addNewDictionary = async (group: TGroup, majors: IMajor[]) => {
  const existedGroup = await DictionaryModel.findOne({ group });
  if (existedGroup) {
    const updatedGroup = await DictionaryModel.findOneAndUpdate(
      { group: group },
      { $addToSet: { majors: { $each: majors } } },
      { new: true }
    );
    return updatedGroup;
  } else {
    const newGroup = new DictionaryModel({
      group,
      majors,
    });
    const savedGroup = await newGroup.save();
    return savedGroup;
  }
};
export { addNewDictionary };
