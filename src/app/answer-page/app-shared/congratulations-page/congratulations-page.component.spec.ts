import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratulationsPageComponent } from './congratulations-page.component';

describe('CongratulationsPageComponent', () => {
  let component: CongratulationsPageComponent;
  let fixture: ComponentFixture<CongratulationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongratulationsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratulationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
