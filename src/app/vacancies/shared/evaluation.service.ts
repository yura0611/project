import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IEvaluation} from "../../app-shared/interfaces/IEvaluation";
import {MatDialog} from "@angular/material/dialog";


@Injectable({
  providedIn: 'root'
})
export class EvaluationService {


  constructor(private http: HttpClient,
              public dialog: MatDialog) {
  }

 private evaluationListSubject = new BehaviorSubject([]);
  public evaluationList$ = this.evaluationListSubject.asObservable();
  private evaluationLinkSubject = new BehaviorSubject('')
  public evaluationLink$ = this.evaluationLinkSubject.asObservable()
  evalId;

  getEvaluations(id): Observable<any> {
    return this.http.get<IEvaluation>(`${environment.API_URL}vacancy/evaluations/${id}`).pipe(
      tap(el => this.evaluationListSubject.next(el))
    )
  }


  setReviewer(id, email): Observable<any> {
    return this.http.put<IEvaluation>(`${environment.API_URL}vacancy/evaluation/${id}/reviewer`, {
      email
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


  public inviteCandidate(invitePayload) {
    return this.http
      .post<string>(`${environment.API_URL}vacancy/invite/${invitePayload.vacancyId}`, {candidate: invitePayload.candidate})
      .pipe(
        tap(link => {
          const  evalList = this.evaluationListSubject.value;
          this.evaluationLinkSubject.next(link['evalLink']);
          evalList.push(link['eval']);
          this.evaluationListSubject.next(evalList);
        })
      )

  }









}
