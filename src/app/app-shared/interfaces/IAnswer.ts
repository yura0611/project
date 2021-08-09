import {IEvaluationProcess} from "./IEvaluationProcess";

export interface IAnswer extends IEvaluationProcess{
    questionId: string;
    _id: string;

}
