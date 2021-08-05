import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTopicsListComponent } from './selected-topics-list.component';

describe('SelectedTopicsListComponent', () => {
  let component: SelectedTopicsListComponent;
  let fixture: ComponentFixture<SelectedTopicsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedTopicsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTopicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
