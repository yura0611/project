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
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<ApplicationsTableItem>;
  // dataSource: ApplicationsTableDataSource;
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.initMaterialTable();
  }


  initMaterialTable = () => {
    this.vacancyTableService.getApplicationsTableData().pipe(
      tap(val => {
        this.data = val;
      })
    ).subscribe();

    this.selection = new SelectionModel<Element>(true, []);
    this.dataSource = new MatTableDataSource<Element>(this.data);
  }


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['select', 'position', 'name', 'weight', 'symbol'];

  // data = Object.assign(EXAMPLE_DATA);


  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // removeSelectedRows() {
  //   this.selection.selected.forEach(item => {
  //     let index: number = EXAMPLE_DATA.findIndex(d => d === item);
  //     console.log(EXAMPLE_DATA.findIndex(d => d === item));
  //   // this.selection.selected.forEach(item => {
  //   //   let index: number = this.data.findIndex(d => d === item);
  //   //   console.log(this.data.findIndex(d => d === item));
  //   //   this.data.splice(index,1)
  //   //   this.dataSource = new MatTableDataSource<Element>(this.data);
  //   // });
  //   // this.selection = new SelectionModel<Element>(true, []);
  // }


  // ngAfterViewInit(): void {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.table.dataSource = this.dataSource;
  // }\

  // tslint:disable-next-line:typedef
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // tslint:disable-next-line:typedef
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      const index: number = this.data.findIndex(d => d === item);
      this.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Element>(this.data);
    });
    this.selection = new SelectionModel<Element>(true, []);
  }


  // tslint:disable-next-line:typedef
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
}


// export interface ApplicationsTableItem {
//   candidate: string;
//   status: string;
//   score: number;
//   reviewer: string;
//   invited: string;
// }


// const EXAMPLE_DATA: Element[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' }
// ];
