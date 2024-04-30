import mongoose from "mongoose";
import { IConclusion } from "../utils/interfaces/Conclusion";
const ConclusionSchema = new mongoose.Schema<IConclusion>(
  {
    Type: {
      type: String,
      required: true,
    },
    Holland: {
      type: String,
      enum: ["R", "I", "A", "S", "E", "C"],
    },
    SchoolScore: {
      type: String,
      enum: ["A", "B", "C", "D"],
    },
    IQ: {
      type: String,
      required: true,
    },
    EQ: {
      type: String,
      required: true,
    },
    Field: {
      type: String,
      required: true,
    },
    Jobs: {
      type: String,
      required: true,
    },
    Conclusion: {
      type: String,
      required: true,
    },
  },
  { collection: "Conclusion", versionKey: false }
);
const ConclusionModel = mongoose.model("ConclusionModel", ConclusionSchema);
export { ConclusionModel };
