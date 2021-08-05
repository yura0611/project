import { Injectable } from '@angular/core';
import {IQuestion, QuestionService} from "../../questions-library/shared/question.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class VacanciesCreateService {

  allQuestions: IQuestion[]
  constructor(public questionService: QuestionService, private http: HttpClient) { }

  getAllQuestions() {
    return this.questionService.getQuestionByFilters()
  }

  createVacancy(id, vacancy) {
    return this.http.post(`${environment.API_URL}vacancy`, {id, vacancy})
      .subscribe()
  }


}