import { Router } from "express";
import {
  getExams,
  addExam,
  deleteExam,
  updateExam,
  uploadConclusion,
  getConclusion,
} from "../controllers/exams";
import upload from "../middlewares/upload";
import { verifyToken } from "../middlewares/verifyToken";
import { getListConclusion } from "../controllers/exams/getListConclusion";
const examRouter = Router();
examRouter.get("/", getExams);
examRouter.post("/addExam", addExam);
examRouter.delete("/deleteExam", deleteExam);
examRouter.put("/updateExam", updateExam);
examRouter.post(
  "/uploadConclusion",

  upload.single("file"),
  uploadConclusion
);
examRouter.post("/getConclusion", getConclusion);
examRouter.get("/getListConclusion", getListConclusion);
export default examRouter;
