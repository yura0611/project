import {Injectable} from '@angular/core';
import {QuestionService} from "../../questions-library/shared/question.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IQuestion} from "../../app-shared/interfaces/IQuestion";


@Injectable()
export class VacanciesCreateService {

  allQuestions: IQuestion[]

  constructor(public questionService: QuestionService, private http: HttpClient) {
  }

  getAllQuestions() {
    return this.questionService.getQuestionByFilters()
  }

  createVacancy(id, vacancy) {
    console.log(id)
    console.log(vacancy)
    return this.http.post(`${environment.API_URL}vacancy`, {id:id, vacancy:vacancy})
      .subscribe()
  }


}
