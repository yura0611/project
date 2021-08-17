import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from "@angular/material/dialog";
import {EvaluationService} from "../../shared/evaluation.service";
import {VacanciesService} from "../../shared/vacancies.service";


@Component({
  selector: 'app-set-reviewer-modal',
  templateUrl: './set-reviewer-modal.component.html',
  styleUrls: ['./set-reviewer-modal.component.scss']
})
export class SetReviewerModalComponent implements OnInit {

  email = '';
  reviewerForm: FormGroup;
  evaluationId;

  constructor(private formBuilder: FormBuilder,
              public evaluationService: EvaluationService,
              public vacanciesService: VacanciesService,
              public dialog: MatDialogRef<SetReviewerModalComponent>,
              ) {
  }

  ngOnInit(): void {
    this.reviewerForm = this.formBuilder.group({
      email: [this.email, [Validators.maxLength(200), Validators.required, Validators.email]],
    });
    this.evaluationId = this.evaluationService.evalId;
  }


  closeModal(): void{
    this.dialog.close();
  }

  setUp(id, email): void{
    this.evaluationService.setReviewer(id, email).subscribe(res => {
      this.dialog.close(res);
    });
  }


}
