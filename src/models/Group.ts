import mongoose from "mongoose";
import { IGroup } from "../utils/interfaces/Group";

const GroupSchema = new mongoose.Schema<IGroup>(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AccountModel",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountModel",
    },
    status: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, collection: "GroupModel", versionKey: false }
);

const GroupModel = mongoose.model("GroupModel", GroupSchema);
export { GroupSchema };
