import express from "express";
import { connectToDb } from "./src/config/db";
import newsRouter from "./src/routes/newsRouter";
import examRouter from "./src/routes/examRouter";
import schoolSubjectRouter from "./src/routes/schoolSubjectRouter";
import "dotenv/config";
import geminiRouter from "./src/routes/geminiRouter";
import ocrRouter from "./src/routes/ocrRouter";
import dictionaryRouter from "./src/routes/dictionaryRouter";
import bodyParser from "body-parser";
import accountRouter from "./src/routes/accountRouter";
import groupRouter from "./src/routes/groupRouter";
import doExamRouter from "./src/routes/doExamRouter";
const app = express();
// Load environment variables based on NODE_ENV
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
connectToDb();
app.use("/news", newsRouter);
app.use("/exams", examRouter);
app.use("/schoolSubjects", schoolSubjectRouter);
app.use("/geminiAI", geminiRouter);
app.use("/ocr", ocrRouter);
app.use("/dictionary", dictionaryRouter);
app.use("/accounts", accountRouter);
app.use("/groups", groupRouter);
app.use("/do-exam", doExamRouter);

// if (process.env.NODE_ENV !== "development") {
//   console.log = () => {}; // Remove console.log on staging
// }
app.use("/", (req, res) => {
  res.send("Hello to Career App Server");
});
app.listen(3000, () => {
  console.log("Listening localhost 3000");
});
