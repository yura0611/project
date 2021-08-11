import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectToAdministratorComponent } from './redirect-to-administrator.component';

describe('RedirectToAdministratorComponent', () => {
  let component: RedirectToAdministratorComponent;
  let fixture: ComponentFixture<RedirectToAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectToAdministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectToAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
