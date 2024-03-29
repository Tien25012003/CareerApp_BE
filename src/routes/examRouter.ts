import { Router } from "express";
import { getExams } from "../controllers/exams/getExams";
const examRouter = Router();
examRouter.get("/getExams", getExams);
export default examRouter;
