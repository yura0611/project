import { Component, OnInit, ViewChild,  } from '@angular/core';
import { VacanciesService} from '../shared/vacancies.service';
import { ApplicationsTableComponent } from './applications-table/applications-table.component';
import {MatDialog} from '@angular/material/dialog';
import {VacanciesInviteModalComponent} from '../vacancies-invite-modal/vacancies-invite-modal.component';
import {Router} from '@angular/router';
import {Constants} from '../../constants/constants';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-vacancies-info',
  templateUrl: './vacancies-info.component.html',
  styleUrls: ['./vacancies-info.component.scss']
})
export class VacanciesInfoComponent implements OnInit {
  @ViewChild('child') child: ApplicationsTableComponent;
  title;
  type;
  status;
  description;
  questions;
  name = 'Angular';
  text = '';
  completed = 0;
  applications = 0;
  time;
  id;
  length;


  constructor(public vacanciesService: VacanciesService,
              public dialog: MatDialog,
              public router: Router,
              private constants: Constants,
              private route: ActivatedRoute) {

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
    this.id = this.route.snapshot.params['id'];
    const desc = 'description';
    this.vacanciesService.getVacancy(this.id)
      .pipe(
        tap(vacancy => {
          this.title = vacancy.title;
          this.status = vacancy.status;
          this.type = vacancy.type;
          this.description = vacancy.description;
          this.time = vacancy.createdAt;
          this.length = this.description.length;
          this.questions = vacancy.questions;
          return '';
        })
      )
      .subscribe();

    this.vacanciesService.candidateSubject.subscribe();
    this.vacanciesService.candidateSubject.next(false);
    this.time =  Date.parse(this.time);
  }



  editVacancy(id): void{
    this.router.navigate([`/vacancy-edit/${id}`]);
  }

  vacancyDelete(id): void{
    this.vacanciesService.deleteVacancy(id);
  }

  getCandidateSubjectValue(): boolean{
    return this.vacanciesService.candidateSubject.getValue();
  }

  removeCandidateRow(): void{
    this.vacanciesService.removeSelectedRow();
  }

  changeStatus(id): void {
    this.vacanciesService.editStatus(id);
  }

  getAvgScore(): number{
    return this.vacanciesService.percentage;
  }



}
