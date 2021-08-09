import {Injectable} from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacancyTableService {

  private EXAMPLE_DATA: ApplicationsTableItem[] = [
    {candidate: 'Abhoy Latif', status: 'invited', score: 0, reviewer: 'Set Up', invited: '15 Sep, 2018'},
    {candidate: 'Chinaza Akachi', status: 'evaluated', score: 75, reviewer: 'Set Up', invited: '15 Sep, 2018'},
    {candidate: 'Justine Marshall', status: 'completed', score: 0, reviewer: 'Set Up', invited: '15 Sep, 2019'},
    {candidate: 'Lu Zhou', status: 'in progress', score: 0, reviewer: 'Set Up', invited: '15 Sep, 2018'},
  ];


  constructor() { }


  getApplicationsTableData = () => of(this.EXAMPLE_DATA);




}

export interface ApplicationsTableItem {
  candidate: string;
  status: string;
  score: number;
  reviewer: string;
  invited: string;
}




