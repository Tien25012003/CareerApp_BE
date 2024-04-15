import { Router } from "express";
import { generateChat } from "../controllers/geminiAI/generateChat";
const geminiRouter = Router();
geminiRouter.post("/generateChat", generateChat);
export default geminiRouter;
