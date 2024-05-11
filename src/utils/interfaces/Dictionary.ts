import { ObjectId } from "mongoose";
import { IResponse } from ".";
export type TGroup = "A" | "A1" | "B" | "C" | "D" | "D7";
export enum EGroup {
  "A",
  "A1",
  "B",
  "C",
  "D",
  "D7",
}
export interface IMajor {
  name: string;
  image: string;
  subjects: string;
  pros: string;
  cons: string;
}
export interface IDictionary {
  group: TGroup;
  majors: IMajor[];
}
export interface IDictionaryResponse extends IResponse {
  data: IDictionary[];
}
