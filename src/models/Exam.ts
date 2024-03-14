import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    description: String,
    background: String,
    type: {
      type: String,
      enum: ["R", "I", "A", "S", "E", "C", "IQ", "EQ"],
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionModel",
      },
    ],
    results: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResultModel",
      },
    ],
  },
  { collection: "Exam", versionKey: false }
);
const ExamModel = mongoose.model("ExamModel", ExamSchema);
export { ExamModel };
