import { Request, Response } from "express";
import { ConclusionModel } from "../../models/Conclusion";
import { ReportModel } from "../../models/Report";
import ErrorUtils from "../../utils/constant/Error";
export const getConclusion = async (req: Request, res: Response) => {
  try {
    const {
      Holland = "R",
      IQ = "-",
      EQ = "-",
      SchoolScore = "A",
      IQScore = 0,
      EQScore = 0,
    } = req.body;
    const query = ConclusionModel.where({ Holland, IQ, EQ, SchoolScore });
    const conclusion = await query.findOne();
    if (conclusion) {
      const reports = [
        { type: Holland, score: 0 },
        { type: "IQ", score: IQScore || 0 },
        { type: "EQ", score: EQScore || 0 },
        { type: SchoolScore, score: 0 },
      ]?.filter(
        (report) =>
          !(
            (report.type === "IQ" || report.type === "EQ") &&
            report.score === 0
          )
      );

      await Promise.all(
        reports?.map(async (report) => {
          const { type, score } = report;
          if (!!type) {
            await ReportModel.findOneAndUpdate(
              { type, score },
              { $inc: { count: 1 } },
              { upsert: true, new: true, setDefaultsOnInsert: true }
            );
          }
        })
      );
      return res.send({
        code: 200,
        data: conclusion,
      });
    }
    return res.send(ErrorUtils.get("CONCLUSION_NOT_EXIST"));
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
