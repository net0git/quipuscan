import { TestBed } from '@angular/core/testing';

import { DatospdfService } from './datospdf.service';

describe('DatospdfService', () => {
  let service: DatospdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatospdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
