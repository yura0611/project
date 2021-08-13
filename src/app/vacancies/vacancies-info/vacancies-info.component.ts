import {Component, OnInit, ViewChild,} from '@angular/core';
import {VacanciesService} from '../shared/vacancies.service';
import {ApplicationsTableComponent} from './applications-table/applications-table.component';
import {MatDialog} from '@angular/material/dialog';
import {VacanciesInviteModalComponent} from '../vacancies-invite-modal/vacancies-invite-modal.component';
import {Router} from '@angular/router';
import {Constants} from '../../constants/constants';
import {ActivatedRoute} from '@angular/router';



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
  vacancy$;


  constructor(public vacanciesService: VacanciesService,
              public dialog: MatDialog,
              public router: Router,
              private constants: Constants,
              private route: ActivatedRoute) {

  }

  openInviteModal(): void {
    this.dialog.open(VacanciesInviteModalComponent, {
      data: {
        vacancyId: this.id
      },
      width: this.constants.modalWidth.s,
      height: this.constants.modalHeight.m
    });
  }

  openSetReviewerModal(): void {
    this.vacanciesService.ReviewerModal();
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.vacanciesService.getVacancy(this.id).subscribe();
    this.vacancy$ = this.vacanciesService.vacancyItem$;
    this.vacanciesService.candidateSubject.subscribe();
    this.vacanciesService.candidateSubject.next(false);
    this.time = Date.parse(this.time);
  }


  editVacancy(id): void {
    this.router.navigate([`/vacancy-edit/${id}`]);
  }

  vacancyDelete(id): void {
    this.vacanciesService.deleteVacancy(id);
  }

  getCandidateSubjectValue(): boolean {
    return this.vacanciesService.candidateSubject.getValue();
  }

  removeCandidateRow(): void {
    this.vacanciesService.removeSelectedRow();
  }

  changeStatus(id): void {
    this.vacanciesService.editStatus(id).subscribe();
    this.vacancy$ = this.vacanciesService.vacancyItem$;
  }

  getAvgScore(): number {
    return this.vacanciesService.percentage;
  }


}
