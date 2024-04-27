import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import ErrorUtils from "../../utils/constant/Error";
// Access your API key as an environment variable (see "Set up your API key" above)
const API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
export const generateChat = async (req: Request, res: Response) => {
  // For text-only input, use the gemini-pro model
  const { prompt } = req.body;
  const isLock = false;
  try {
    if (!prompt) return res.send(ErrorUtils.get("PROMT_IS_EMPTY"));
    if (isLock) return res.send(ErrorUtils.get("LOCK_AI"));
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return res.send({
      code: 200,
      data: text,
    });
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
