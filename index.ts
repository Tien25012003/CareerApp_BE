import express from "express";
import { connectToDb } from "./src/utils/db";
import newsRouter from "./src/routes/newsRouter";
import examRouter from "./src/routes/examRouter";
import schoolSubjectRouter from "./src/routes/schoolSubjectRouter";
import "dotenv/config";
import geminiRouter from "./src/routes/geminiRouter";
import ocrRouter from "./src/routes/ocrRouter";
import dictionaryRouter from "./src/routes/dictionaryRouter";
import cors from "cors";
const app = express();
// Load environment variables based on NODE_ENV
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

app.use(express.json());

connectToDb();
app.use("/news", newsRouter);
app.use("/exams", examRouter);
app.use("/schoolSubjects", schoolSubjectRouter);
app.use("/geminiAI", geminiRouter);
app.use("/ocr", ocrRouter);
app.use("/dictionary", dictionaryRouter);
// if (process.env.NODE_ENV !== "development") {
//   console.log = () => {}; // Remove console.log on staging
// }
app.use("/", (req, res) => {
  res.send("Hello to Career App Server");
});
app.listen(3000, () => {
  console.log("Listening localhost 3000");
});
