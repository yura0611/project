import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionNewModalComponent } from './question-new-modal.component';

describe('QuestionNewModalComponent', () => {
  let component: QuestionNewModalComponent;
  let fixture: ComponentFixture<QuestionNewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionNewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
