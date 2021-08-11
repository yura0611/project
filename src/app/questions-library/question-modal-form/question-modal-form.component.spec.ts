import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionModalFormComponent } from './question-modal-form.component';

describe('QuestionModalFormComponent', () => {
  let component: QuestionModalFormComponent;
  let fixture: ComponentFixture<QuestionModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionModalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
