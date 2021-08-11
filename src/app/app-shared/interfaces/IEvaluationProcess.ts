import {IVacancy} from "./IVacancy";

export interface IEvaluationProcess {
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
    questionId: string,
    _id: string
  },
  _id: string,
  status: string
}
