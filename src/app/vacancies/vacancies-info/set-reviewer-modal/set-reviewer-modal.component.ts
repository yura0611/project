import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-set-reviewer-modal',
  templateUrl: './set-reviewer-modal.component.html',
  styleUrls: ['./set-reviewer-modal.component.scss']
})
export class SetReviewerModalComponent implements OnInit {

  email = '';
  reviewerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.reviewerForm = this.formBuilder.group({
      email: [this.email, [Validators.maxLength(200), Validators.required]],
    });
  }


  closeModal(){

  }
}
