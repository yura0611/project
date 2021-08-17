import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {TestVacanciesTableItem} from '../../app-shared/interfaces/ITestVacanciesTableItem';
import {IVacancy} from "../../app-shared/interfaces/IVacancy";
import {EvaluationService} from "./evaluation.service";

@Injectable()
export class VacanciesService {




 private vacanciesListSubject = new BehaviorSubject([]);
  public vacanciesList$ = this.vacanciesListSubject.asObservable();
  private vacancyItemSubject = new BehaviorSubject(null);
  public vacancyItem$ = this.vacancyItemSubject.asObservable();
  public changedList = new Subject();
  private userAndVacancyDataSubject = new BehaviorSubject({})
  public userAndVacancyData$ = this.userAndVacancyDataSubject.asObservable()

  vacancy = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

  data;
  selection;
  dataSource;
  status;
  candidateSubject = new BehaviorSubject(false);
  dataSubject = new BehaviorSubject(0);
  percentage = 0;


  constructor(private http: HttpClient,
              private router: Router,
              public dialog: MatDialog,
              public evaluationService: EvaluationService) {
  }


  getAllVacancies(): Observable<any> {
    return this.http.get<IVacancy[]>(`${environment.API_URL}vacancy`)
  }


  getVacancy(id): Observable<any> {
   return this.http.get<IVacancy>(`${environment.API_URL}vacancy/find-one/${id}`).pipe(
     tap(vacancy => {
       this.vacancyItemSubject.next(vacancy)
     })
   )
  }



  setMessage(data): void {
    this.vacancy = data;
  }

  getMessage(): string {
    return this.vacancy;
  }



  public editStatus(id: string): Observable<any> {
    return this.http.post<IVacancy>(`${environment.API_URL}vacancy/status`, {
      _id: id
    }).pipe(
      tap(
        data => {
          this.vacancyItemSubject.next(data);
        }
      )
    )
  }

  editVacancy(obj: TestVacanciesTableItem) {
    return this.http.put<IVacancy[]>(`${environment.API_URL}vacancy/edit/${obj._id}`, {
      title: obj.title,
      description: obj.description,
      type: obj.type,
    }).pipe(
      tap( data => {
        this.vacancyItemSubject.next(data);
      })
    )
  }

  deleteVacancy(id: string): void {
    this.http.delete(`${environment.API_URL}vacancy/delete/${id}`).subscribe((data: TestVacanciesTableItem[]) => {
      this.vacanciesListSubject.next(data);
    });
    this.router.navigate(['/vacancies']);
  }


}




