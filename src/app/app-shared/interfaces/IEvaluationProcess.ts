import {IVacancies} from "./IVacancies";

export interface IEvaluationProcess {
  candidate: {
    role: string,
    isActive: boolean,
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
  };
  vacancy: IVacancies,
  answers: {
    _id: string;
    questionId: string;
  }
}
