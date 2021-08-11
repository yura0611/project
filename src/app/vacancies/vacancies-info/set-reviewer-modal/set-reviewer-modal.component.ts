import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-set-reviewer-modal',
  templateUrl: './set-reviewer-modal.component.html',
  styleUrls: ['./set-reviewer-modal.component.scss']
})
export class SetReviewerModalComponent implements OnInit {

  email = '';
  reviewerForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.reviewerForm = this.formBuilder.group({
      email: [this.email, [Validators.maxLength(200), Validators.required, Validators.email]],
    });
  }


  closeModal(){
    this.dialog.closeAll();
  }

  setUp(){
    // TODO: - link with backend reviewers
    this.dialog.closeAll();
  }

}
