import { Router } from "express";
import {
  addDictionary,
  getDictionary,
  updateDictionary,
  deleteDictonary,
  deleteMajor,
  uploadFileDictionary,
  addSchool,
  getSchool,
  deleteAllSchool,
} from "../controllers/dictionary";
import upload from "../middlewares/upload";
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
dictionaryRouter.get("/getSchool", getSchool);
dictionaryRouter.delete("/deleteAllSchool", deleteAllSchool);
export default dictionaryRouter;
