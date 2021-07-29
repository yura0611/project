import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vacancies-create',
  templateUrl: './vacancies-create.component.html',
  styleUrls: ['./vacancies-create.component.scss']
})
export class VacanciesCreateComponent implements OnInit {
  vacanciesForm: FormGroup;




  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.vacanciesForm = this.formBuilder.group({
      title: [null, [Validators.maxLength(200), Validators.required]],
      type: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.maxLength(800)]],
      link:[null],
      status:['active']
    });
  }


  saveForm() {
    if (!this.vacanciesForm.valid) {
      return;
    }
    console.log(this.vacanciesForm.value);
    this.router.navigate(['/vacancies']); 
    
  }

 
}
