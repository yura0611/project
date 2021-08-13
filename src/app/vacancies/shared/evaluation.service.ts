import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IEvaluation} from '../../app-shared/interfaces/IEvaluation';


@Injectable({
  providedIn: 'root'
})
export class EvaluationService {


  constructor(private http: HttpClient) { }

  private evaluationListSubject = new BehaviorSubject([]);
  public evaluationList$ = this.evaluationListSubject.asObservable();


  getEvaluations(id): Observable<any>{
      return this.http.get<IEvaluation>(`${environment.API_URL}vacancy/evaluations/${id}`).pipe(
        tap(el => this.evaluationListSubject.next(el))
      )
  }







}
