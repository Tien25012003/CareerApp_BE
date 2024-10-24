import { ITracking } from ".";

export interface IChatBot extends ITracking {
  question: string;
  answer: string;
  keywords: string;
}
