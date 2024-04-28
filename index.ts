import express from "express";
import { connectToDb } from "./src/utils/db";
import { NewCategoryModel } from "./src/models/NewCategory";
import newsRouter from "./src/routes/newsRouter";
import examRouter from "./src/routes/examRouter";
import schoolSubjectRouter from "./src/routes/schoolSubjectRouter";
import "dotenv/config";
import geminiRouter from "./src/routes/geminiRouter";
import { convertImageToText } from "./src/controllers/OCR/imageToText";

const app = express();
app.use(express.json());

connectToDb();
app.use("/news", newsRouter);
app.use("/exams", examRouter);
app.use("/schoolSubjects", schoolSubjectRouter);
app.use("/geminiAI", geminiRouter);
app.use("/convertImageToText", convertImageToText);
app.post("/", async (req, res) => {
  const category = req.body;
  const newCategoryModel = new NewCategoryModel(category);
  await newCategoryModel.save();
  res.status(200).json(newCategoryModel);
});

app.listen(3000, () => {
  console.log("Listening localhost 3000");
});
