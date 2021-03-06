import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {VacanciesService} from "../shared/vacancies.service";
import {patterns} from "../../app-shared/regexPatterns/patterns";
import {filter, tap} from "rxjs/operators";
import {Subscription} from "rxjs";
import {EvaluationService} from "../shared/evaluation.service";

@Component({
  selector: 'app-vacancies-invite-modal',
  templateUrl: './vacancies-invite-modal.component.html',
  styleUrls: ['./vacancies-invite-modal.component.scss']
})
export class VacanciesInviteModalComponent implements OnInit, OnDestroy {
  @ViewChild('linkField') linkField: ElementRef;
  invitationForm: FormGroup;
  showClose = false;
  subscription: Subscription;
  invitationalLink = this.evaluationService.evaluationLink$.pipe(
    tap(data => console.log(data)),
    filter(val => !!val),
    tap((data) => {
      if (!!data) {
        this.showClose = true
      }

    })
  )
  constructor(private formBuilder: FormBuilder,
              private vacancyService: VacanciesService,
              private evaluationService: EvaluationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialogRef<VacanciesInviteModalComponent>) {
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
    this.subscription = this.evaluationService.inviteCandidate(payload).subscribe()
  }

  onClose() {
    this.dialog.close()
  }

  ngOnDestroy() {
      this.subscription.unsubscribe()
  }

}
