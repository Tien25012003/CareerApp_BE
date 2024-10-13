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

type TPermission = {
  code: string;
  name: string;
  permission: TFeatureDetail;
};

export interface IAccount {
  id: Types.ObjectId;
  username: string;
  name: string;
  email: string;
  role: string;
  groups: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  accessToken?: string;
  password: string;
  status: number; //0: deactive ; 1: active
  permissions?: TPermission[];
  deviceId: string;
}
