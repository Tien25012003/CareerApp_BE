import { Router } from "express";
import { ocrGemini } from "../controllers/OCR/ocrGemini";
import upload from "../middlewares/upload";

const ocrRouter = Router();
ocrRouter.post("/ocrGemini", upload.single("file"), ocrGemini);
export default ocrRouter;
