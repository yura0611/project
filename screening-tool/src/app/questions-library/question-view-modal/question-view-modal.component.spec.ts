import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionViewModalComponent } from './question-view-modal.component';

describe('QuestionViewModalComponent', () => {
  let component: QuestionViewModalComponent;
  let fixture: ComponentFixture<QuestionViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
