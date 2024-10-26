import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { addPrompt } from "../controllers/chat-bot/addPrompt";
import { deletePrompt } from "../controllers/chat-bot/deletePrompt";
import { getPrompts } from "../controllers/chat-bot/getPrompts";
import { getPrompt } from "../controllers/chat-bot/getPrompt";
import { updatePrompt } from "../controllers/chat-bot/updatePrompt";
import { executePrompt } from "../controllers/chat-bot/executePrompt";
const chatBotRouter = Router();

chatBotRouter.post("/", verifyToken, addPrompt);
chatBotRouter.delete("/", verifyToken, deletePrompt);
chatBotRouter.get("/", verifyToken, getPrompts);
chatBotRouter.get("/detail", verifyToken, getPrompt);
chatBotRouter.put("/", verifyToken, updatePrompt);
chatBotRouter.post("/execute", verifyToken, executePrompt);

export default chatBotRouter;
