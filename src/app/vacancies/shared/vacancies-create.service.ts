import {Injectable} from '@angular/core';
import {QuestionService} from "../../questions-library/shared/question.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IQuestion} from "../../app-shared/interfaces/IQuestion";
import {tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";


@Injectable()
export class VacanciesCreateService {
  private updateVacancyListSubject: BehaviorSubject<any> = new BehaviorSubject([])
  public updateVacancyList$ = this.updateVacancyListSubject.asObservable()
  allQuestions: IQuestion[]

  constructor(public questionService: QuestionService, private http: HttpClient) {
  }

  getAllQuestions() {
    return this.questionService.getQuestionByFilters()
  }

  createVacancy(id, vacancy) {
    return this.http.post(`${environment.API_URL}vacancy`, {id:id, vacancy:vacancy})
      .pipe(
        tap(data => {
          this.updateVacancyListSubject.next(data)
        })
      )
      .subscribe()
  }


}
