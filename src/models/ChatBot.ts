import mongoose from "mongoose";
import { IChatBot } from "../utils/interfaces/ChatBot";

const ChatBotSchema = new mongoose.Schema<IChatBot>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    keywords: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "ChatBot",
    versionKey: false,
  }
);

const ChatBotModel = mongoose.model("ChatBotModel", ChatBotSchema);
export { ChatBotModel };
