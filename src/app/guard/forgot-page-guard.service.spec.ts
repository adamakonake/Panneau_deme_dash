import { TestBed } from '@angular/core/testing';

import { ForgotPageGuardService } from './forgot-page-guard.service';

describe('ForgotPageGuardService', () => {
  let service: ForgotPageGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPageGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
