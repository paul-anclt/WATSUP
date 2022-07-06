import { TestBed } from '@angular/core/testing';

import { FakeTradingService } from './fake-trading.service';

describe('FakeTradingService', () => {
  let service: FakeTradingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeTradingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
