import { TestBed } from '@angular/core/testing';

import { VacancyTableService } from './vacancy-table.service';

describe('VacancyTableService', () => {
  let service: VacancyTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacancyTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
