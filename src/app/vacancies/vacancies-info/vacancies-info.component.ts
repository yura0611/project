import { Component, OnInit, ViewChild,  } from '@angular/core';
import { VacanciesService} from '../shared/vacancies.service';
import { ApplicationsTableComponent } from './applications-table/applications-table.component';
import {MatDialog} from '@angular/material/dialog';
import {VacanciesInviteModalComponent} from '../vacancies-invite-modal/vacancies-invite-modal.component';
import {Router} from '@angular/router';
import {Constants} from '../../constants/constants';



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
  time;


  constructor(public vacanciesService: VacanciesService,
              public dialog: MatDialog,
              public router: Router,
              private constants: Constants) {

  }

  openInviteModal(): void{
    this.dialog.open(VacanciesInviteModalComponent, {
      width: this.constants.modalWidth,
      height: this.constants.modalHeight
    });
  }

  openSetReviewerModal(): void{
    this.vacanciesService.ReviewerModal();
  }



  ngOnInit(): void {
    const desc = 'description';
    const date = 'createdAt';
    this.vacanciesService.candidateSubject.subscribe();
    this.vacanciesService.candidateSubject.next(false);
    this.message =  this.vacanciesService.getMessage();
    this.text = this.message[desc];
    this.time =  Date.parse(this.message[date]);
  }



  editVacancy(): void{
    this.router.navigate(['/vacancy-info']);
  }

  VacancyDelete(id): void{
    this.vacanciesService.deleteVacancy(id);
  }

  getCandidateSubjectValue(): boolean{
    return this.vacanciesService.candidateSubject.getValue();
  }

  removeCandidateRow(): void{
    this.vacanciesService.removeSelectedRow();
  }




}
