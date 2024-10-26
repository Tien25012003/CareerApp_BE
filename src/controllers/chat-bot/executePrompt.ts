import { GoogleGenerativeAI } from "@google/generative-ai";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest, TResponse } from "../../utils/types/meta";
import { Response } from "express";
import { AccountModel } from "../../models/Account";
import { Types } from "mongoose";
import { ChatBotModel } from "../../models/ChatBot";
import { EChatBotType } from "../../utils/enums/chat-bot.enum";
import { IChatBot } from "../../utils/interfaces/ChatBot";
import { generateInstruction } from "./data/generateInstruction";

// Access your API key as an environment variable (see "Set up your API key" above)
const API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY!);

const generationConfig = {
  maxOutputTokens: 200,
  temperature: 0.9,
};

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig,
});

export const executePrompt = async (
  req: TRequest<{ prompt: string }>,
  res: Response<TResponse<string>>
) => {
  try {
    const { prompt } = req.body;
    const isLock = false;

    if (!prompt) return res.send(ErrorUtils.get("PROMT_IS_EMPTY"));
    if (isLock) return res.send(ErrorUtils.get("LOCK_AI"));

    // ANYNOMOUS
    //if (!Types.ObjectId.isValid(req.userId as any)) {
    const prompts: IChatBot[] = await ChatBotModel.find({
      type: EChatBotType.SYSTEM,
    });
    if (!prompts) {
      return res.send(ErrorUtils.get("DATA_NOT_FOUND"));
    }
    const faqs = prompts
      ?.map(
        (prompt, index) =>
          `${index + 1}. Question: ${prompt.question}\nAnswer: ${
            prompt.answer
          }\nKeywords: ${prompt.keywords}`
      )
      .join("\n");
    const parts = [{ text: generateInstruction({ question: prompt, faqs }) }];

    const result = await model.generateContent({
      contents: [{ role: "user", parts: parts }],
      generationConfig,
    });

    if (result?.response?.candidates) {
      if (
        result?.response?.candidates![0].content.parts[0].text ===
        "Sorry! I do not have enough information to answer this question"
      ) {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("text", text);
        return res.send({
          code: 200,
          data: text,
        });
      }
    }

    return res.send({
      code: 200,
      data: result?.response?.candidates![0].content.parts[0].text,
    });
    //}

    // const user = await AccountModel.findById(req.userId);
    // if (!user) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));
  } catch (error) {
    console.log(error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
