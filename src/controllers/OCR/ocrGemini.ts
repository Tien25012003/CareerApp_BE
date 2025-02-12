import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";
import ErrorUtils from "../../utils/constant/Error";
import OCRDataset from "./mocks/OCRDataset";
import { convertTextToArray } from "./utils/convertTextToArray";
const API_KEY = process.env.OCR_KEY;
const genAI = new GoogleGenerativeAI(API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const ocrGemini = async (req: Request, res: Response) => {
  try {
    const { base64Image, mimeType } = req.body;
    //console.log("base64", base64Image);
    const result = await model.generateContent([
      OCRDataset,
      { inlineData: { data: JSON.parse(base64Image), mimeType: mimeType } },
    ]);
    console.log("result", result);
    const text = await result.response.text();
    console.log("text", text);
    if (text) {
      const response = await convertTextToArray(text);
      return res.send({ code: 200, data: response });
    }
    return res.send(ErrorUtils.get("OCR_ERROR"));
  } catch (e) {
    console.log("e >>>", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
