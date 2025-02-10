import { Router } from "express";

import { getListSchool } from "../controllers/school-dictionary/getListSchool";
import { getSchool } from "../controllers/school-dictionary/getSchoolDetail";
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
schoolDictionaryRouter.get("/list", verifyToken, getListSchool);
schoolDictionaryRouter.get("/", verifyToken, getSchool);
export default schoolDictionaryRouter;
