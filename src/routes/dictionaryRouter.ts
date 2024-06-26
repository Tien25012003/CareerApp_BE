import { Router } from "express";
import {
  addDictionary,
  getDictionary,
  updateDictionary,
  deleteDictonary,
  deleteMajor,
  uploadFileDictionary,
  addSchool,
  getAllSchool,
  deleteAllSchool,
  getSchool,
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
dictionaryRouter.get("/getAllSchool", getAllSchool);
dictionaryRouter.delete("/deleteAllSchool", deleteAllSchool);
dictionaryRouter.get("/getSchool", getSchool);
export default dictionaryRouter;
