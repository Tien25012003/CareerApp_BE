import { Router } from "express";
import { convertImageToText } from "../controllers/ocr/convertImageToText";

const ocrRouter = Router();
ocrRouter.post("/convertImageToText", convertImageToText);
export default ocrRouter;
