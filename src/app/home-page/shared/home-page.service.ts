import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IQuestion} from "../../questions-library/shared/question.service";
import {tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

export interface IVacancies {
  _id: string;
  author: string;
  createdAt: string;
  editedAt: string;
  description: string;
  questions: IQuestion[];
  status: string;
  title: string;
  type: string;
  _v: number
}

@Injectable({providedIn: 'root'})
export class HomePageService {
  private activeVacancySubject = new BehaviorSubject(0);
  public activeVacancy$ = this.activeVacancySubject.asObservable()
  constructor(private http: HttpClient) {
  }

  getAllVacancies() {
    return this.http.get<IVacancies[]>(`${environment.API_URL}vacancy`).pipe(
      tap(el => this.activeVacancySubject.next(el.filter(el => el.status === 'Active').length))
    )
  }
}
