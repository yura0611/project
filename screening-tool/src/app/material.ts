import { NgModule } from '@angular/core';


import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [MatTabsModule,MatCardModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatChipsModule,MatCheckboxModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule,MatIconModule],
  exports: [MatTabsModule, MatCardModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatChipsModule,MatCheckboxModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule,MatIconModule],
})
export class MaterialModule { }
