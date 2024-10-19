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
import { addExamToGroup } from "../controllers/exams-in-group/addExamToGroup";
import { removeExamFromGroup } from "../controllers/exams-in-group/removeExamFromGroup";
import { getExamList } from "../controllers/exams/getExamList";
import { getExam } from "../controllers/exams/getExam";
const examRouter = Router();

// EXAM
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

// EXAM LIST
examRouter.get("/examList", verifyToken, getExamList);
examRouter.get("/detail", verifyToken, getExam);

// EXAM IN GROUP
examRouter.put("/addExamToGroup", verifyToken, addExamToGroup);
examRouter.put("/removeExamFromGroup", verifyToken, removeExamFromGroup);
export default examRouter;
