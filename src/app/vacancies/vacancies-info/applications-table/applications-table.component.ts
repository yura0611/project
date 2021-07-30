import {Component, OnInit} from '@angular/core';
import {VacancyTableService} from '../../shared/vacancy-table.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.scss']
})
export class ApplicationsTableComponent implements OnInit {



  constructor(
    private vacancyTableService: VacancyTableService
  ) {
  }
  data;
  selection;
  dataSource;

  displayedColumns = ['SELECT', 'CANDIDATE', 'STATUS', 'SCORE', 'REVIEWER', 'INVITED'];
  ngOnInit(){
    this.initMaterialTable();
  }

  initMaterialTable = () => {
    this.vacancyTableService.getApplicationsTableData().pipe(
      tap(val => {this.data = val; })
    ).subscribe();

    this.selection = new SelectionModel<Element>(true, []);
    this.dataSource = new MatTableDataSource<Element>(this.data);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      const index: number = this.data.findIndex(d => d === item);
      console.log(this.data.findIndex(d => d === item));
      this.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Element>(this.data);
    });
    this.selection = new SelectionModel<Element>(true, []);
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

