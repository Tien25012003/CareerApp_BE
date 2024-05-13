import { Response, Request } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { convertFileToGenerativePart } from "./utils/convertFileToGenerativePart";
import { promises as fsPromises } from "fs-extra";
import path from "path";
import { convertTextToArray } from "./utils/convertTextToArray";
const API_KEY = process.env.OCR_KEY;
const genAI = new GoogleGenerativeAI(API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
const prompt = `Convert image to text?. After converting to image, you will have a text like this (or just similar to this): 
|Toán|85|94|86|94|8,0|Giỏi|Giỏi
|Vật lí|86|84|89|84|8,0|Giỏi|Giỏi
|Hóa học|80|82|86|81|8,0|Giỏi|Giỏi
|Sinh học|80|74|84|76|8,0|Giỏi|Giỏi
|Ngữ văn|80|81|74|81|8,0|Giỏi|Giỏi
|Lịch sử|84|86|89|86|8,0|Giỏi|Giỏi
|Địa lí|80|83|84|81|8,0|Giỏi|Giỏi
|Công nghệ|94|90|96|90|9,0|Xuất sắc|Xuất sắc
|Âm nhạc|84|89|83|85|8,0|Giỏi|Giỏi
|Mỹ thuật|84|89|83|85|8,0|Giỏi|Giỏi
|Thể dục|84|89|83|85|8,0|Giỏi|Giỏi
|NN2|1|0|1|0|1,0|Kém|Kém. 
Please extract the subject names and their corresponding average scores for the entire year (the collumn at the end of array). 
For example, extract "Toán" with the average score "8,0", "Vật lí" with the average score "8,0", and so on.
After this, please give me response at this format: 
Toán:8,0 
Vật lí:8,0
Hóa học:8,0
Sinh học:8,0
Ngữ văn:8,0
Lịch sử:8,0
Địa lí:8,0
Công nghệ:9,0
Tin học:9,0
Giáo dục công dân: 8,0`;
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
      const result = await model.generateContent([prompt, imagePart]);
      const text = await result.response.text();
      console.log("text", text);
      const response = convertTextToArray(text);
      console.log("response", response);

      return res.send({ code: 200, data: response });
    }

    return res.send(ErrorUtils.get("OCR_ERROR"));
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
