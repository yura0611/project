import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {


  constructor(private http: HttpClient) { }

  private evaluationListSubject = new BehaviorSubject([]);
  public evaluationList$ = this.evaluationListSubject.asObservable();








}
