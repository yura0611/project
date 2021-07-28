import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ApplicationsTableComponent } from './applications-table/applications-table.component';
import {MatDialog} from '@angular/material/dialog';
import {VacanciesInviteModalComponent} from '../vacancies-invite-modal/vacancies-invite-modal.component';

@Component({
  selector: 'app-vacancies-info',
  templateUrl: './vacancies-info.component.html',
  styleUrls: ['./vacancies-info.component.scss']
})
export class VacanciesInfoComponent implements OnInit {
  @ViewChild('child') child: ApplicationsTableComponent;
  message: string;
  name = 'Angular';
  showMore = false;
  text = '';
  percentage = 0;
  completed = 0;
  applications = 0;
  constructor(private shared: SharedService,
              public dialog: MatDialog) {}

  openInviteModal(){
    this.dialog.open(VacanciesInviteModalComponent,{
      width: '496px',
      height: '488px',
    })
  }


  ngOnInit(): void {
    this.message =  this.shared.getMessage()
    this.text = this.message['description'];

  }





}
