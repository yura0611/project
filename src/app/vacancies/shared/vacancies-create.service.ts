import { Injectable } from '@angular/core';
import {IQuestion, QuestionService} from "../../questions-library/shared/question.service";


@Injectable({
  providedIn: 'root'
})
export class VacanciesCreateService {

  allQuestions: IQuestion[]
  constructor(public questionService: QuestionService) { }

  getAllQuestions() {
    return this.questionService.getQuestionByFilters()
  }


}
