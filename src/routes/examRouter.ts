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
examRouter.get("/", verifyToken, getExams);
examRouter.post("/addExam", verifyToken, addExam);
examRouter.delete("/deleteExam", verifyToken, deleteExam);
examRouter.put("/updateExam", verifyToken, updateExam);
examRouter.post(
  "/uploadConclusion",
  verifyToken,
  upload.single("file"),
  uploadConclusion
);
examRouter.post("/getConclusion", verifyToken, getConclusion);
examRouter.get("/getListConclusion", verifyToken, getListConclusion);
export default examRouter;
