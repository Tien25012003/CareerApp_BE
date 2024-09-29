import { Types } from "mongoose";

enum EFeature {
  DASHBOARD = "DASHBOARD",
  ACCOUNT = "ACCOUNT",
  EXAM_SYSTEM = "EXAM_SYSTEM",
  EXAM_CUSTOM = "EXAM_CUSTOM",
  NEWS = "NEWS",
  CHATBOT = "CHATBOT",
  LIBRARY = "LIBRARY",
}
type TFeatureDetail = {
  create: boolean;
  edit: boolean;
  delete: boolean;
  view: boolean;
};

type TPermission = Record<EFeature, TFeatureDetail>;

export interface IAccount {
  username: string;
  name: string;
  email: string;
  role: string;
  groups: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
  password: string;
  status: number; //0: deactive ; 1: active
  permissions: TPermission[];
}
