import { IResponse } from ".";

export enum ESchoolType {
  PRIVATE = "Tư thục",
  PUBLIC = "Công lập",
}
export interface ISchoolMajor {
  majorCode: string;
  majorName: string;
  entryScore: number;
  duration: string;
  fee: string;
}
export interface ISchoolDictionary {
  name: string;
  type: ESchoolType;
  address: string[];
  city: string;
  website: string;
  email: string;
  phone: string;
  majors: ISchoolMajor[];
  addmissions: string;
}

export interface ISchoolDictionaryRaw {
  name: string;
  type: ESchoolType;
  address: string;
  city: string;
  website: string;
  email: string;
  phone: string;
  majors: string;
  addmissions: string;
}
export interface ISchoolDictionaryResponse extends IResponse {
  data: ISchoolDictionary[];
}

export interface IGetListSchoolDictionaryRequest {
  category?: string;
  search?: string;
  minScore?: number;
  provinces?: string;
}
export interface IGetSchoolDictionaryRequest {
  schoolId?: string;
}
