import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {VacanciesService} from "../shared/vacancies.service";
import {patterns} from "../../app-shared/regexPatterns/patterns";
import {filter, tap} from "rxjs/operators";

@Component({
  selector: 'app-vacancies-invite-modal',
  templateUrl: './vacancies-invite-modal.component.html',
  styleUrls: ['./vacancies-invite-modal.component.scss']
})
export class VacanciesInviteModalComponent implements OnInit {
  @ViewChild('linkField') linkField: ElementRef;
  invitationForm: FormGroup;
  showClose = false;
  invitationalLink = this.vacancyService.evaluationLink$.pipe(
    filter(val => !!val),
    tap(() => this.showClose = true)
  )
  constructor(private formBuilder: FormBuilder,
              private vacancyService: VacanciesService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.invitationForm = new FormGroup({
      email: new FormControl(null, [Validators.pattern(patterns.regexEmail),Validators.maxLength(200), Validators.required]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(800)]),
    });
  }

  public onInvite(): void {
    const candidate = this.invitationForm.value
    const vacancyId = this.data.vacancyId
    const payload = {
      candidate,
      vacancyId
    }
    this.vacancyService.inviteCandidate(payload)
  }

  onClose() {
    this.dialog.closeAll()
  }


}
