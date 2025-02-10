import { Router } from "express";

import { uploadSchoolDictionary } from "../controllers/school-dictionary/uploadSchoolDictionary";
import { uploadImages } from "../middlewares/upload";
import { verifyToken } from "../middlewares/verifyToken";
const schoolDictionaryRouter = Router();

schoolDictionaryRouter.post(
  "/uploadSchoolDictionary",
  verifyToken,
  uploadImages.single("file"),
  uploadSchoolDictionary
);
export default schoolDictionaryRouter;
