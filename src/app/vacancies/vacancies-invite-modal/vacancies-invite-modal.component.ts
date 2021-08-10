import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {VacanciesService} from "../shared/vacancies.service";

@Component({
  selector: 'app-vacancies-invite-modal',
  templateUrl: './vacancies-invite-modal.component.html',
  styleUrls: ['./vacancies-invite-modal.component.scss']
})
export class VacanciesInviteModalComponent implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  invitationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private vacancyService: VacanciesService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.invitationForm = this.formBuilder.group({
      email: [this.email, [Validators.maxLength(200), Validators.required]],
      firstName: [this.firstName, [Validators.required]],
      lastName: [this.lastName, [Validators.required, Validators.maxLength(800)]],
    });
  }

  public onInvite(): void {
    const candidate = this.invitationForm.value
    const vacancyId = this.data.vacancyId
    const payload = {
      candidate,
      vacancyId
    }
    this.vacancyService.inviteCandidate(payload).subscribe(value => console.log(value))
  }

}
