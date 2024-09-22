import mongoose from "mongoose";
import { IAccount } from "./Account";

export interface IGroup {
  groupName: string;
  members: mongoose.Schema.Types.ObjectId[];
  owner: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: number; //0: deactive ; 1: active
}
