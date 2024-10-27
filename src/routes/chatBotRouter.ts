import { Router } from "express";
import { addPrompt } from "../controllers/chat-bot/addPrompt";
import { addPromptToGroup } from "../controllers/chat-bot/chat-bot-in-group/addPromptTogroup";
import { executePromptInGroup } from "../controllers/chat-bot/chat-bot-in-group/executePromptInGroup";
import { removePromptFromGroup } from "../controllers/chat-bot/chat-bot-in-group/removePromptFromGroup";
import { deletePrompt } from "../controllers/chat-bot/deletePrompt";
import { executePrompt } from "../controllers/chat-bot/executePrompt";
import { getPrompt } from "../controllers/chat-bot/getPrompt";
import { getPrompts } from "../controllers/chat-bot/getPrompts";
import { updatePrompt } from "../controllers/chat-bot/updatePrompt";
import { verifyToken } from "../middlewares/verifyToken";
const chatBotRouter = Router();

chatBotRouter.post("/", verifyToken, addPrompt);
chatBotRouter.delete("/", verifyToken, deletePrompt);
chatBotRouter.get("/", verifyToken, getPrompts);
chatBotRouter.get("/detail", verifyToken, getPrompt);
chatBotRouter.put("/", verifyToken, updatePrompt);
chatBotRouter.post("/execute", verifyToken, executePrompt);

chatBotRouter.put("/add-prompt-to-group", verifyToken, addPromptToGroup);
chatBotRouter.put(
  "/remove-prompt-from-group",
  verifyToken,
  removePromptFromGroup
);

chatBotRouter.post("/execute-in-group", verifyToken, executePromptInGroup);
export default chatBotRouter;
