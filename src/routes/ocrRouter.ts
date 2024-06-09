import { Router } from "express";
import { ocrGemini } from "../controllers/OCR/ocrGemini";
import upload, { uploadImages } from "../middlewares/upload";

const ocrRouter = Router();
//ocrRouter.post("/ocrGemini", upload.single("file"), ocrGemini);
//ocrRouter.post("/ocrGemini", uploadImages.single("file"), ocrGemini);
ocrRouter.post("/ocrGemini", ocrGemini);
export default ocrRouter;
