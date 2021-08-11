import {IQuestions} from "./IQuestions";

export interface IVacancy {
  _id: string;
  author: string;
  createdAt: string;
  editedAt: string;
  description: string;
  questions: IQuestions[];
  status: string;
  title: string;
  type: string;
  _v: number
}
