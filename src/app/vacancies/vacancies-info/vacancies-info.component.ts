import { Component, OnInit, ViewChild,  } from '@angular/core';
import { VacanciesService} from '../shared/vacancies.service';
import { ApplicationsTableComponent } from './applications-table/applications-table.component';
import {MatDialog} from '@angular/material/dialog';
import {VacanciesInviteModalComponent} from '../vacancies-invite-modal/vacancies-invite-modal.component';
import {Router} from '@angular/router';


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
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];



  constructor(public vacanciesService: VacanciesService,
              public dialog: MatDialog,
              public router: Router) {

  }

  openInviteModal(): void{
    this.dialog.open(VacanciesInviteModalComponent, {
      width: '496px',
      height: '488px',
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
    console.log(this.time);
  }



  editVacancy(): void{
    this.router.navigate(['/vacancy-info']);
  }

}
