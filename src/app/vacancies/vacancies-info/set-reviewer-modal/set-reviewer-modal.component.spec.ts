import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetReviewerModalComponent } from './set-reviewer-modal.component';

describe('SetReviewerModalComponent', () => {
  let component: SetReviewerModalComponent;
  let fixture: ComponentFixture<SetReviewerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetReviewerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetReviewerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
