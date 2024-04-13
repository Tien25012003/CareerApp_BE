import { Response, Request } from "express";
import { SubjectsModel } from "../../models/Subjects";
import { ISubjects } from "../../utils/interfaces/SchoolSubjects";
import ErrorUtils from "../../utils/constant/Error";
export const addSubjects = async (
  req: Request<any, any, ISubjects>,
  res: Response
) => {
  try {
    const { subjects } = req.body;
    await SubjectsModel.insertMany([...subjects]).then((savedSubjects) => {
      return res.send({
        code: 200,
        data: savedSubjects,
      });
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
