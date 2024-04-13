import { Router } from "express";
import { ISubject } from "../utils/interfaces/SchoolSubjects";
import mongoose from "mongoose";

const SubjectsSchema = new mongoose.Schema<ISubject>(
  {
    name: {
      type: String,
      required: true,
      default: "",
    },
    vnName: {
      type: String,
      required: true,
      default: "",
    },
  },
  { collection: "Subject", versionKey: false }
);
const SubjectsModel = mongoose.model("SubjectModel", SubjectsSchema);
export { SubjectsModel };
