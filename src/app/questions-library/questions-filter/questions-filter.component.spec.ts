import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsFilterComponent } from './questions-filter.component';

describe('QuestionsFilterComponent', () => {
  let component: QuestionsFilterComponent;
  let fixture: ComponentFixture<QuestionsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
