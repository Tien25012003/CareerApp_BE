import mongoose from "mongoose";
import { IDictionary } from "../utils/interfaces/Dictionary";
const DictionarySchema = new mongoose.Schema<IDictionary>(
  {
    group: {
      type: String,
      required: true,
      enum: ["A0", "A1", "B", "C", "D1", "D7"],
    },
    majors: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        subjects: {
          type: String,
          required: true,
        },
        pros: {
          type: String,
          required: true,
        },
        cons: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: "Dictionary", versionKey: false }
);
const DictionaryModel = mongoose.model("Dictionary", DictionarySchema);
export { DictionaryModel };
