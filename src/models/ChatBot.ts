import mongoose from "mongoose";
import { IChatBot } from "../utils/interfaces/ChatBot";
import { EChatBotType } from "../utils/enums/chat-bot.enum";

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
    type: {
      type: String,
      enum: EChatBotType,
      default: EChatBotType.SYSTEM,
    },
    creator: {
      type: String,
      required: true,
    },
    updator: {
      type: String,
    },

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountModel",
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
