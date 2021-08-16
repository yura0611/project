import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IEvaluation} from "../../app-shared/interfaces/IEvaluation";
import {SetReviewerModalComponent} from "../vacancies-info/set-reviewer-modal/set-reviewer-modal.component";
import {Constants} from "../../constants/constants";
import {MatDialog} from "@angular/material/dialog";


@Injectable({
  providedIn: 'root'
})
export class EvaluationService {


  constructor(private http: HttpClient,
              private constants: Constants,
              public dialog: MatDialog) {
  }

  private evaluationListSubject = new BehaviorSubject([]);
  public evaluationList$ = this.evaluationListSubject.asObservable();
  evalId;

  getEvaluations(id): Observable<any> {
    return this.http.get<IEvaluation>(`${environment.API_URL}vacancy/evaluations/${id}`).pipe(
      tap(el => console.log(el)),
      tap(el => this.evaluationListSubject.next(el))
    )
  }


  setReviewer(id, email): Observable<any> {
    return this.http.put<IEvaluation>(`${environment.API_URL}vacancy/invite-reviewer/${id}`, {
      email: email
    }).pipe(tap(data => {
      const editedEvaluation = data;
      const evaluationList = this.evaluationListSubject.value;
      const newEvaluationList = evaluationList.map(el => {
        if (editedEvaluation._id === el._id){
            return editedEvaluation;
        }
        return el;
      })
      this.evaluationListSubject.next(newEvaluationList);
    }))
  }




}
