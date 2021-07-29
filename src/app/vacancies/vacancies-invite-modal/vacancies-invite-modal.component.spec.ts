import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesInviteModalComponent } from './vacancies-invite-modal.component';

describe('VacanciesInviteModalComponent', () => {
  let component: VacanciesInviteModalComponent;
  let fixture: ComponentFixture<VacanciesInviteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacanciesInviteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesInviteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
