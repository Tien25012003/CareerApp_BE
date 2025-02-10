import { Request, Response } from "express";
import xlsx from "xlsx";
import { SchoolDictionaryModel } from "../../models/SchoolDictionary";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import {
  ISchoolDictionary,
  ISchoolDictionaryRaw,
  ISchoolDictionaryResponse,
} from "../../utils/interfaces/SchoolDictionary";
export const uploadSchoolDictionary = async (
  req: Request,
  res: Response<ISchoolDictionaryResponse | IErrorData>
) => {
  try {
    const { isReplaceAll = true } = req.query;
    if (!req.file) {
      return res.send(ErrorUtils.get("SERVER_ERROR"));
    }

    const fileContent = req.file.buffer.toString("utf-8");
    // const schoolDictionaries = await xlsx().fromString(fileContent);
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const schoolDictionaries = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
    const validateSchoolDictionaries = schoolDictionaries
      .filter((value) => {
        const schooDictionary = value as unknown as ISchoolDictionaryRaw;
        return schooDictionary?.email !== "";
      })
      .map((value) => {
        const schooDictionary = value as unknown as ISchoolDictionaryRaw;
        console.log("raw", schooDictionary);
        const listAddress = schooDictionary.address
          ? schooDictionary.address.split("\n")
          : [];
        const listMajors = schooDictionary.majors
          ? schooDictionary.majors
              .split("\n")
              .filter((major) => {
                const [majorCode, majorName, entryScore, duration, fee] =
                  major.split(";");
                return !!entryScore;
              })
              .map((major) => {
                const [majorCode, majorName, entryScore, duration, fee] =
                  major.split(";");
                return {
                  majorCode,
                  majorName,
                  entryScore,
                  duration,
                  fee,
                };
              })
          : [];
        console.log("convert", {
          ...schooDictionary,
          address: listAddress,
          majors: listMajors,
        });
        return {
          ...schooDictionary,
          address: listAddress,
          majors: listMajors,
        } as unknown as ISchoolDictionary;
      });

    const isReplaceAllBool = isReplaceAll;
    if (isReplaceAllBool) {
      await SchoolDictionaryModel.deleteMany({});
    }

    await SchoolDictionaryModel.insertMany(validateSchoolDictionaries);
    return res.send({
      code: 200,
      data: validateSchoolDictionaries,
    });
  } catch (e) {
    console.error(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
