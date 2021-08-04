import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.invitationForm = this.formBuilder.group({
      email: [this.email, [Validators.maxLength(200), Validators.required]],
      firstName: [this.firstName, [Validators.required]],
      lastName: [this.lastName, [Validators.required, Validators.maxLength(800)]],
    });
  }


}
