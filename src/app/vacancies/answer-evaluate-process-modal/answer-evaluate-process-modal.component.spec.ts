import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerEvaluateProcessModalComponent } from './answer-evaluate-process-modal.component';

describe('AnswerEvaluateProcessModalComponent', () => {
  let component: AnswerEvaluateProcessModalComponent;
  let fixture: ComponentFixture<AnswerEvaluateProcessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerEvaluateProcessModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerEvaluateProcessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
