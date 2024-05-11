import { Router } from "express";
import { addDictionary } from "../controllers/dictionary/addDictionary";
import { getDictionary } from "../controllers/dictionary/getDictionary";
import { updateDictionary } from "../controllers/dictionary/updateDictionary";
import { deleteDictonary } from "../controllers/dictionary/deleteDictionary";
import { deleteMajor } from "../controllers/dictionary/deleteMajor";
import { uploadFileDictionary } from "../controllers/dictionary/uploadFileDictionary";
import upload from "../middlewares/upload";
import { addSchool } from "../controllers/dictionary/addSchool";
const dictionaryRouter = Router();
dictionaryRouter.get("/", getDictionary);
dictionaryRouter.post("/addDictionary", addDictionary);
dictionaryRouter.put("/updateDictonary", updateDictionary);
dictionaryRouter.delete("/deleteDictionary", deleteDictonary);
dictionaryRouter.put("/deleteMajor", deleteMajor);
dictionaryRouter.post(
  "/uploadFileDictionary",
  upload.single("file"),
  uploadFileDictionary
);
dictionaryRouter.post("/addSchool", upload.single("file"), addSchool);
export default dictionaryRouter;
