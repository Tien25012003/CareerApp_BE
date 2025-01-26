import csv from "csvtojson";
import { Request, Response } from "express";
import { ConclusionModel } from "../../models/Conclusion";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import { IConclusion, IConclusionResponse } from "../../utils/interfaces";
export const uploadConclusion = async (
  req: Request,
  res: Response<IConclusionResponse | IErrorData>
) => {
  try {
    const { isReplaceAll = true } = req.query;

    // Convert file buffer to string
    const fileContent = req?.file?.buffer.toString("utf-8");

    // const conclusions = await csv().fromFile(req.file?.path!);
    // Parse CSV data from the file content
    if (!fileContent) {
      return res.send(ErrorUtils.get("SERVER_ERROR"));
    }
    const conclusions = await csv().fromString(fileContent);

    //console.log("conclusion", conclusions);
    const validateConclusions = conclusions?.filter(
      (conclusion: IConclusion) => conclusion.Type !== ""
    );

    if (JSON.parse(isReplaceAll as string)) {
      await ConclusionModel.deleteMany({});
    }
    await ConclusionModel.insertMany(validateConclusions);
    return res.send({
      code: 200,
      data: validateConclusions,
    });
  } catch (e) {
    console.log("e", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
