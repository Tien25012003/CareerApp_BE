import mongoose, { Schema } from "mongoose";
import { IAccount } from "../utils/interfaces/Account";

const FeatureDetailSchema = new mongoose.Schema(
  {
    create: { type: Boolean, required: true },
    edit: { type: Boolean, required: true },
    delete: { type: Boolean, required: true },
    view: { type: Boolean, required: true },
  },
  { _id: false } // No need for a separate _id for this sub-document
);

const PermissionSchema = new mongoose.Schema(
  {
    DASHBOARD: { type: FeatureDetailSchema, required: true },
    ACCOUNT: { type: FeatureDetailSchema, required: true },
    EXAM_SYSTEM: { type: FeatureDetailSchema, required: true },
    EXAM_CUSTOM: { type: FeatureDetailSchema, required: true },
    NEWS: { type: FeatureDetailSchema, required: true },
    CHATBOT: { type: FeatureDetailSchema, required: true },
    LIBRARY: { type: FeatureDetailSchema, required: true },
  },
  { _id: false }
);

const AccountSchema = new mongoose.Schema<IAccount>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Địa chỉ email không chính xác"],
      lowercase: true,
    },
    groups: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "GroupModel", // References the Group model
      },
    ],
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Number,
      required: true,
    },
    permissions: {
      type: [PermissionSchema], // Array of permission objects
      required: true,
    },
  },
  { timestamps: true, collection: "Accounts", versionKey: false }
);

const AccountModel = mongoose.model("AccountModel", AccountSchema);
export { AccountModel };
