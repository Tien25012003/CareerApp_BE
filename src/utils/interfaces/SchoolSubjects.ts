import { ObjectId } from "mongoose";

export interface ISubject {
  name: string;
  vnName: string;
}

export interface ISubjects {
  subjects: ISubject[];
}
