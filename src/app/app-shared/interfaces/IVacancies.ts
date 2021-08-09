import {IQuestion} from "./IQuestions";

export interface IVacancies {
  _id: string;
  author: string;
  createdAt: string;
  editedAt: string;
  description: string;
  questions: IQuestion[];
  status: string;
  title: string;
  type: string;
  _v: number
}