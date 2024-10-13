import { ObjectId } from "mongoose";

export interface ISubject {
  _id: ObjectId;
  name: string;
  vnName: string;
  createdAt?: Date;
  updatedAt?: Date;
  creator?: string;
  updator?: string;
  creatorId?: ObjectId;
  groupId?: ObjectId;
}
export interface ICaculateSubject extends ISubject {
  value: string;
}
export interface ISubjects {
  subjects: ISubject[];
}

export interface ISubjectREQ {
  name?: string;
  vnName?: string;
}
