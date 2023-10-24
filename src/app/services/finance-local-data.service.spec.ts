import { TestBed } from '@angular/core/testing';

import { FinanceLocalDataService } from './finance-local-data.service';

describe('FinanceLocalDataService', () => {
  let service: FinanceLocalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceLocalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
