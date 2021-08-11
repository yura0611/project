import {Injectable} from '@angular/core';
import {QuestionService} from "../../questions-library/shared/question.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IQuestion} from "../../app-shared/interfaces/IQuestions";


@Injectable()
export class VacanciesCreateService {

  allQuestions: IQuestion[]

  constructor(public questionService: QuestionService, private http: HttpClient) {
  }

  getAllQuestions() {
    return this.questionService.getQuestionByFilters()
  }

  createVacancy(id, vacancy) {
    return this.http.post(`${environment.API_URL}vacancy`, {id, vacancy})
      .subscribe()
  }


}
