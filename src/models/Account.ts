import mongoose from "mongoose";
import { IAccount } from "../utils/interfaces/Account";

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
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Địa chỉ email không chính xác"],
      lowercase: true,
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true, collection: "AccountModel", versionKey: false }
);

const AccountModel = mongoose.model("AccountModel", AccountSchema);
export { AccountModel };
