import mongoose, { Schema } from "mongoose";
import {
  ESchoolType,
  ISchoolDictionary,
  ISchoolMajor,
} from "../utils/interfaces/SchoolDictionary";

const SchoolMajorSchema = new Schema<ISchoolMajor>({
  majorCode: { type: String, required: false },
  majorName: { type: String, required: false },
  entryScore: { type: String, required: false },
  duration: { type: String, required: false },
  fee: { type: String, required: false },
});

const SchoolDictionarySchema = new Schema<ISchoolDictionary>(
  {
    name: { type: String, required: false },
    type: { type: String, enum: Object.values(ESchoolType), required: false },
    address: { type: [String], required: false },
    city: { type: String, required: false },
    website: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    majors: { type: [SchoolMajorSchema], required: false },
    addmissions: { type: String, required: false },
  },
  { timestamps: true, collection: "SchoolDictionary", versionKey: false }
);

const SchoolDictionaryModel = mongoose.model<ISchoolDictionary>(
  "SchoolDictionary",
  SchoolDictionarySchema
);

export { SchoolDictionaryModel };
