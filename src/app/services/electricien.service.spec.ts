import { TestBed } from '@angular/core/testing';

import { ElectricienService } from './electricien.service';

describe('ElectricienService', () => {
  let service: ElectricienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectricienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
