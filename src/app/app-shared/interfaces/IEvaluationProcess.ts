import {IVacancy} from "./IVacancy";
import {IQuestion} from "./IQuestion";

export interface IEvaluationProcess {
  averageScore: number,
  candidate: {
    role: string,
    isActive: boolean,
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
  };
  vacancy: IVacancy,
  answers: {
    status: string,
    question: IQuestion,
    answer: string,
    score: number,
    _id: string
  },
  _id: string,
  status: string
}
