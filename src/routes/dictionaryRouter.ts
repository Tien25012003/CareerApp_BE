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
import { verifyToken } from "../middlewares/verifyToken";
const dictionaryRouter = Router();
dictionaryRouter.get("/", verifyToken, getDictionary);
dictionaryRouter.post("/addDictionary", verifyToken, addDictionary);
dictionaryRouter.put("/updateDictonary", verifyToken, updateDictionary);
dictionaryRouter.delete("/deleteDictionary", verifyToken, deleteDictonary);
dictionaryRouter.put("/deleteMajor", verifyToken, deleteMajor);
dictionaryRouter.post(
  "/uploadFileDictionary",
  verifyToken,
  upload.single("file"),
  uploadFileDictionary
);
dictionaryRouter.post(
  "/addSchool",
  verifyToken,
  upload.single("file"),
  addSchool
);
dictionaryRouter.get("/getAllSchool", verifyToken, getAllSchool);
dictionaryRouter.delete("/deleteAllSchool", verifyToken, deleteAllSchool);
dictionaryRouter.get("/getSchool", verifyToken, getSchool);
export default dictionaryRouter;
