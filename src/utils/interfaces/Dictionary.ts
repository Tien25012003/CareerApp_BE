import { IResponse } from ".";
export type TGroup = "A0" | "A1" | "B" | "C" | "D1" | "D7";
export enum EGroup {
  "A0",
  "A1",
  "B",
  "C",
  "D1",
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
