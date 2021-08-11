import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {SetReviewerModalComponent} from '../vacancies-info/set-reviewer-modal/set-reviewer-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {Constants} from '../../constants/constants';
import {IVacancy} from '../../app-shared/interfaces/IVacancy';
import {ApplicationsTableItem} from '../../app-shared/interfaces/IApplecationsTableItem';
import {TestVacanciesTableItem} from '../../app-shared/interfaces/ITestVacanciesTableItem';

@Injectable()
export class VacanciesService {

  private EXAMPLE_DATA_FOR_APPLICATION_TABLE: ApplicationsTableItem[] = [
    {_id: '1', candidate: 'Abhoy Latif', status: 'invited', score: 0, reviewer: 'Set Up', invited: '15 Sep, 2018'},
    {
      _id: '1',
      candidate: 'Chinaza Akachi',
      status: 'evaluated',
      score: 75,
      reviewer: 'Set Up',
      invited: '15 Sep, 2018'
    },
    {
      _id: '1',
      candidate: 'Justine Marshall',
      status: 'completed',
      score: 0,
      reviewer: 'Set Up',
      invited: '15 Sep, 2019'
    },
    {_id: '1', candidate: 'Lu Zhou', status: 'in progress', score: 0, reviewer: 'Set Up', invited: '15 Sep, 2018'},
  ];


  private vacanciesListSubject = new BehaviorSubject([]);
  public vacanciesList$ = this.vacanciesListSubject.asObservable();
  private vacancyListSubject = new BehaviorSubject([]);


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
              private constants: Constants) {
  }


  getAllVacancies(): Observable<any> {
    return this.http.get<IVacancy[]>(`${environment.API_URL}/vacancy`).pipe(
      tap(vacancies => this.vacanciesListSubject.next(vacancies))
    );
  }

  getVacancy(id): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}vacancy/find-one`, {_id: id}).pipe(
      tap(vacancy => this.vacancyListSubject.next(vacancy)
      ));
  }

  getApplicationsTableData = () => of(this.EXAMPLE_DATA_FOR_APPLICATION_TABLE);

  setMessage(data): void {
    this.vacancy = data;
  }

  getMessage(): string {
    return this.vacancy;
  }

  initMaterialTable = () => {
    this.getApplicationsTableData().pipe(
      tap(val => {
        this.data = val;
      })
    ).subscribe();

    this.selection = new SelectionModel<Element>(false, []);
    this.dataSource = new MatTableDataSource<Element>(this.data);
  }

  removeSelectedRow(): void {
    this.selection.selected.forEach(item => {
      const index: number = this.data.findIndex(d => d === item);
      this.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Element>(this.data);
    });
    this.selection = new SelectionModel<Element>(false, []);
    this.candidateSubject.next(false);
  }

  toggleSubject(): void {
    if (this.selection.selected.length === 0) {
      this.candidateSubject.next(true);
    }
    if (this.selection.selected.length === 1) {
      this.candidateSubject.next(false);
    }
  }

  ReviewerModal(): void {
    this.dialog.open(SetReviewerModalComponent, {
      width: this.constants.modalWidth,
      height: this.constants.modalHeight,
    });
  }

  editStatus(id: string): void {
    this.http.post(`${environment.API_URL}vacancy/status`, {
      _id: id
    }).pipe(
      tap(el => console.log(el))
    ).subscribe((data: TestVacanciesTableItem[]) => {
      this.vacanciesListSubject.next(data);
    });
  }

  editVacancy(obj): void {
    this.http.put(`${environment.API_URL}vacancy/edit`, {
      _id: obj._id,
      title: obj.title,
      description: obj.description,
      type: obj.type,
    }).pipe(
      tap(() => {
        this.vacanciesListSubject.next(obj);
      })
    ).subscribe();
  }

  deleteVacancy(id: string): void {
    this.http.post(`${environment.API_URL}vacancy/delete`, {_id: id}).subscribe((data: TestVacanciesTableItem[]) => {
      this.vacanciesListSubject.next(data);
    });
    this.router.navigate(['/vacancies']);
  }

  public inviteCandidate(invitePayload) {
    return this.http.post(`${environment.API_URL}vacancy/invite`, invitePayload)
      .pipe(

      )
  }
}




