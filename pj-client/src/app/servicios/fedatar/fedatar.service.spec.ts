import { TestBed } from '@angular/core/testing';

import { FedatarService } from './fedatar.service';

describe('FedatarService', () => {
  let service: FedatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FedatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
