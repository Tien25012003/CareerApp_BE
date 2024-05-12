import { Router } from "express";
import { convertImageToText } from "../controllers/ocr/convertImageToText";
import { ocrGemini } from "../controllers/OCR/ocrGemini";
import upload from "../middlewares/upload";

const ocrRouter = Router();
ocrRouter.post("/convertImageToText", convertImageToText);
ocrRouter.post("/ocrGemini", upload.single("file"), ocrGemini);
export default ocrRouter;
