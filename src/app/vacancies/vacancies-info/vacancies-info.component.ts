import {Component, OnInit, ViewChild,} from '@angular/core';
import {VacanciesService} from '../shared/vacancies.service';
import {ApplicationsTableComponent} from './applications-table/applications-table.component';
import {MatDialog} from '@angular/material/dialog';
import {VacanciesInviteModalComponent} from '../vacancies-invite-modal/vacancies-invite-modal.component';
import {Router} from '@angular/router';
import {Constants} from '../../constants/constants';
import {ActivatedRoute} from '@angular/router';
import {EvaluationService} from "../shared/evaluation.service";
import {tap} from "rxjs/operators";



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
  avgScore = 0;

  constructor(public vacanciesService: VacanciesService,
              public dialog: MatDialog,
              public router: Router,
              private constants: Constants,
              private route: ActivatedRoute,
              private evaluationService: EvaluationService) {

  }

  openInviteModal(): void {
    const dialogRef = this.dialog.open(VacanciesInviteModalComponent, {
      data: {
        vacancyId: this.id
      },
      width: this.constants.modalWidth.s,
      height: this.constants.modalHeight.m
    });
    dialogRef.afterClosed().subscribe()
  }



  ngOnInit(): void {
    this.getAvgScore()
    this.id = this.route.snapshot.params['id'];
    this.vacanciesService.getVacancy(this.id).subscribe();
    this.vacancy$ = this.vacanciesService.vacancyItem$;
  }


  editVacancy(id): void {
    this.router.navigate([`/vacancy-edit/${id}`]);
  }

  vacancyDelete(id): void {
    this.vacanciesService.deleteVacancy(id);
  }


  changeStatus(id): void {
    this.vacanciesService.editStatus(id).subscribe();
    this.vacancy$ = this.vacanciesService.vacancyItem$;
  }

  getAvgScore(): void {
    this.evaluationService.getEvaluations(this.route.snapshot.params['id']).pipe(
      tap(evaluation => {
        let score = 0;
        evaluation.map(el => {
          if (el.averageScore && el.status === 'evaluated') {
            score += el.averageScore
          }
        })
        this.avgScore = score / evaluation.length
      })
    ).subscribe()
  }


}
