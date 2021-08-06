import {IQuestion} from "../../questions-library/shared/question.service";

export interface IVacancies {
  _id: string;
  author: string;
  createdAt: string;
  description: string;
  questions: IQuestion[];
  status: string;
  title: string;
  type: string;
  _v: number
}
