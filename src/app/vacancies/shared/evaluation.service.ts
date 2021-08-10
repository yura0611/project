import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {


  constructor(private http: HttpClient) { }

  private evaluationListSubject = new BehaviorSubject([]);
  public evaluationList$ = this.evaluationListSubject.asObservable();





  getAllEvaluations(id){
      return this.http.get<any>(`${environment.API_URL}vacancy/:${id}/evaluations`).pipe()
        .subscribe();
  }



}
