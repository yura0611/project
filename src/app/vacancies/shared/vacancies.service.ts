import {Injectable} from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {  tap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SetReviewerModalComponent} from '../vacancies-info/set-reviewer-modal/set-reviewer-modal.component';
import {MatDialog} from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class VacanciesService {

  private EXAMPLE_DATA_FOR_APPLICATION_TABLE: ApplicationsTableItem[] = [
    {_id: '1', candidate: 'Abhoy Latif', status: 'invited', score: 0, reviewer: 'Set Up', invited: '15 Sep, 2018'},
    {_id: '1', candidate: 'Chinaza Akachi', status: 'evaluated', score: 75, reviewer: 'Set Up', invited: '15 Sep, 2018'},
    {_id: '1', candidate: 'Justine Marshall', status: 'completed', score: 0, reviewer: 'Set Up', invited: '15 Sep, 2019'},
    {_id: '1', candidate: 'Lu Zhou', status: 'in progress', score: 0, reviewer: 'Set Up', invited: '15 Sep, 2018'},
  ];


  private vacanciesListSubject = new BehaviorSubject([]);
  public vacanciesList$ = this.vacanciesListSubject.asObservable();


  vacancy = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

  data;
  selection;
  dataSource;
  getVacancies = 'http://localhost:3000/api/vacancy';
  deleteVacancyUrl = 'http://localhost:3000/api/vacancy/delete/';



  candidateSubject =  new BehaviorSubject(false);
  dataSubject = new BehaviorSubject(0);


  constructor(private http: HttpClient,
              private router: Router,
              public dialog: MatDialog, ) { }


  getAllVacancies(): void {
    this.http.get<any>(this.getVacancies).pipe(
      tap(vacancies => this.vacanciesListSubject.next(vacancies))
    ).subscribe(data => {
    });
  }

  getApplicationsTableData = () => of(this.EXAMPLE_DATA_FOR_APPLICATION_TABLE);


  setMessage(data): void{
    this.vacancy = data;
  }

  // tslint:disable-next-line:typedef
  getMessage() {
    return this.vacancy;
  }

  initMaterialTable = () => {
    this.getApplicationsTableData().pipe(
      tap(val => {this.data = val; })
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



  ToggleSubject(): void{
    if ( this.selection.selected.length === 0) {
      this.candidateSubject.next(true);
    }
    if ( this.selection.selected.length === 1){
      this.candidateSubject.next(false);
    }
  }

  ReviewerModal(): void{
    this.dialog.open(SetReviewerModalComponent, {
      width: '496px',
      height: '488px',
    });
  }





  deleteVacancy(id: string): void {
    this.http.post(this.deleteVacancyUrl, {_id: id}).subscribe((data: TestVacanciesTableItem[]) => {
      this.vacanciesListSubject.next(data);
    });
    this.router.navigate(['/vacancies']);
  }

}

export interface ApplicationsTableItem {
  _id: string;
  candidate: string;
  status: string;
  score: number;
  reviewer: string;
  invited: string;
}

export interface VacanciesTableItem {
  _id: string;
  vacancy: string;
  type: string;
  status: string;
  number_of_applicants: number;
  opened: string;
  description: string;
}

export interface TestVacanciesTableItem {
  _id: string;
  title: string;
  description: string;
  status: string;
  type: string;
  questions: [];
}

