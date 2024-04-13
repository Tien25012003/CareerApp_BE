import mongoose from "mongoose";
import { IExam } from "../utils/interfaces/Exam";
//"R", "I", "A", "S", "E", "C", "IQ", "EQ"
const ExamSchema = new mongoose.Schema<IExam>(
  {
    type: {
      type: String,
      enum: ["R", "I", "A", "S", "E", "C", "IQ", "EQ"],
    },
    questions: [
      {
        questionTitle: {
          type: String,
          required: true,
        },
        image: String,
        options: [
          {
            image: String,
            content: {
              type: String,
              require: true,
            },
            isResult: {
              type: Boolean,
              default: false,
            },
            standardScore: Number,
          },
        ],
      },
    ],
    results: [
      {
        score: [Number],
        content: {
          type: String,
          required: true,
        },
        image: String,
      },
    ],
  },
  { collection: "Exam", versionKey: false }
);
const ExamModel = mongoose.model("ExamModel", ExamSchema);
export { ExamModel };
