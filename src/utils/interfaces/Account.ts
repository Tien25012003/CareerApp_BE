import { Types } from "mongoose";

export interface IAccount {
  username: string;
  name: string;
  email: string;
  role: string;
  groups: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  status: number; //0: deactive ; 1: active
}
