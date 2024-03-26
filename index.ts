import express from "express";
import { connectToDb } from "./src/utils/db";
import { NewCategoryModel } from "./src/models/NewCategory";
import { NewsModel } from "./src/models/News";
import { ExamModel } from "./src/models/Exam";
const app = express();
app.use(express.json());

connectToDb();
app.get("/", async (req, res) => {
  try {
    await NewCategoryModel.find({})
      .populate({ path: "listNews", model: NewsModel })
      .then((category) => res.status(200).json(category));
  } catch (e) {
    console.log(e);
  }
});
app.get("/exam", async (req, res) => {
  try {
    await ExamModel.find({}).then((exam) => res.status(200).json(exam));
  } catch (e) {
    console.log(e);
  }
});
app.post("/", async (req, res) => {
  const category = req.body;
  const newCategoryModel = new NewCategoryModel(category);
  await newCategoryModel.save();
  res.status(200).json(newCategoryModel);
});

app.listen(3000, () => {
  console.log("Listening localhost 3000");
});
