import { ObjectId } from "mongoose";

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
}
export interface IResult {
  score?: number | string | number[];
  content: string;
  image?: string;
}
export interface IExam {
  type: TExam;
  questions: IQuestion[];
  results: IResult[];
}
