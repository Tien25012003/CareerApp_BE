import { Router } from "express";
import { addDictionary } from "../controllers/dictionary/addDictionary";
import { getDictionary } from "../controllers/dictionary/getDictionary";
const dictionaryRouter = Router();
dictionaryRouter.get("/", getDictionary);
dictionaryRouter.post("/addDictionary", addDictionary);

export default dictionaryRouter;
