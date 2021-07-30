import { Injectable } from '@angular/core';
import {question, QuestionService} from "../../questions-library/shared/question.service";


@Injectable({
  providedIn: 'root'
})
export class VacanciesCreateService {

  allQuestions: question[]
  constructor(public questionService: QuestionService) { }

  getAllQuestions() {
    return this.questionService.getQuestionByFilters()
  }


}
