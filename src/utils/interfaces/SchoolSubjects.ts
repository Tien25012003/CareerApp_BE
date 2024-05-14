import { ObjectId } from "mongoose";

export interface ISubject {
  _id: ObjectId;
  name: string;
  vnName: string;
}
export interface ICaculateSubject extends ISubject {
  value: string;
}
export interface ISubjects {
  subjects: ISubject[];
}
