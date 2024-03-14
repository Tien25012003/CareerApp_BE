import mongoose from "mongoose";
const ResultSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      shortImage: {
        type: String,
        required: true,
      },
      longImage: String,
    },
  },
  { collection: "Result", versionKey: false }
);
const ResultModel = mongoose.model("ResultModel", ResultSchema);
export { ResultModel };
