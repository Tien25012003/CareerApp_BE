import { ObjectId } from "mongoose";
import { IQuestion } from ".";

export interface IMyAnswer {
  answers: ObjectId[];
  score?: number;
  questionId: ObjectId;
  shortAnswer: string;
}

export interface IDoExam {
  _id: ObjectId;
  examId: ObjectId;
  examName: String;
  groupId: ObjectId;
  totalScore: number;
  myAnswers: IMyAnswer[];
  creatorId: ObjectId;
  createdAt: Date;
  creator: string;
}

export interface IAddDoExamREQ {
  examId: ObjectId;
  groupId: ObjectId;
  myAnswers: IMyAnswer[];
}

export interface IGetDoExamREQ {
  groupId: ObjectId;
  examName?: string;
}

export interface IDoExamDetailRES extends IDoExam {
  questions: IQuestion[];
}
