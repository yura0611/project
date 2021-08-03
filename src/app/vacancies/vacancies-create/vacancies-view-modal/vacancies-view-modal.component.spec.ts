import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesViewModalComponent } from './vacancies-view-modal.component';

describe('VacanciesViewModalComponent', () => {
  let component: VacanciesViewModalComponent;
  let fixture: ComponentFixture<VacanciesViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacanciesViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
