import mongoose from "mongoose";
import { IResponse } from ".";
import { EExamCategory, EExamStatus, EQuestionType } from "../enums/exam.enum";

type TExam = "R" | "I" | "A" | "S" | "E" | "C" | "IQ" | "EQ";
declare interface IOption {
  image?: string;
  content: string;
  isResult?: boolean;
  standardScore?: number;
}
export interface IQuestion {
  questionTitle: string;
  image?: string;
  options?: IOption[];

  // new item => for Design Exam
  questionType?: EQuestionType;
}
export interface IResult {
  score?: number | string | number[];
  content: string;
  image?: string;
  detail?: string;
}
export interface IExam {
  type?: TExam;
  questions: IQuestion[];
  results: IResult[];

  // new response
  name?: string;
  category: EExamCategory;
  createdAt?: Date;
  creator?: string; // email
  updatedAt?: Date;
  updator?: string; // email
  status?: EExamStatus;

  // FOREIGN KEY
  creatorId: mongoose.Schema.Types.ObjectId;
  groupId?: mongoose.Schema.Types.ObjectId;
}
export interface IExamResponse extends IResponse {
  data: IExam[];
}

export interface IExamREQ {
  category?: EExamCategory;
  name?: string;
  type?: TExam;
  creator?: string;
  updator?: string;
  status?: EExamStatus;
}
