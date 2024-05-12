import { Response, Request } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { convertFileToGenerativePart } from "./utils/convertFileToGenerativePart";
import { promises as fsPromises } from "fs-extra";
import path from "path";
const API_KEY = process.env.OCR_KEY;
const genAI = new GoogleGenerativeAI(API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
export const ocrGemini = async (req: Request, res: Response) => {
  const prompt = "Convert image to text?";
  try {
    //console.log(req.file);
    const imagePart = await convertFileToGenerativePart(req.file);
    const directoryPath = path.join(__dirname, "../../../public/uploads");
    const files = await fsPromises.readdir(directoryPath);
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      await fsPromises.unlink(filePath);
      console.log("Successfully deleted file: ", filePath);
    }
    if (imagePart) {
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = await response.text();
      console.log("text", text);
      return res.send({ code: 200, data: text });
    }

    return res.send(ErrorUtils.get("OCR_ERROR"));
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
