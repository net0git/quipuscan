import { TestBed } from '@angular/core/testing';

import { LectorBarrasService } from './lector-barras.service';

describe('LectorBarrasService', () => {
  let service: LectorBarrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LectorBarrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
