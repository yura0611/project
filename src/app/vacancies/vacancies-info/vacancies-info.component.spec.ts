import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesInfoComponent } from './vacancies-info.component';

describe('VacanciesEditComponent', () => {
  let component: VacanciesInfoComponent;
  let fixture: ComponentFixture<VacanciesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacanciesInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
