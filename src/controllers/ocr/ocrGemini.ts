import { Response, Request } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { convertFileToGenerativePart } from "./utils/convertFileToGenerativePart";
import { promises as fsPromises } from "fs-extra";
import path from "path";
import { convertTextToArray } from "./utils/convertTextToArray";
import OCRDataset from "./mocks/OCRDataset";
const API_KEY = process.env.OCR_KEY;
const genAI = new GoogleGenerativeAI(API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
export const ocrGemini = async (req: Request, res: Response) => {
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
      const result = await model.generateContent([OCRDataset, imagePart]);
      const text = await result.response.text();
      console.log("text", text);
      const response = await convertTextToArray(text);
      console.log("response", response);
      return res.send({ code: 200, data: response });
    }

    return res.send(ErrorUtils.get("OCR_ERROR"));
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
