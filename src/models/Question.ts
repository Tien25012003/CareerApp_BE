import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    questionTitle: {
      type: String,
      required: true,
    },
    answer: [
      {
        content: String,
        isResult: Boolean,
      },
    ],
  },
  { collection: "Question", versionKey: false }
);
const QuestionModel = mongoose.model("QuestionModel", QuestionSchema);
export { QuestionModel };
