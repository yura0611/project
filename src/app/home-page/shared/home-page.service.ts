import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {IVacancies} from "../../app-shared/interfaces/IVacancies";




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
