import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesCreateComponent } from './vacancies-create.component';

describe('VacanciesCreateComponent', () => {
  let component: VacanciesCreateComponent;
  let fixture: ComponentFixture<VacanciesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacanciesCreateComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
