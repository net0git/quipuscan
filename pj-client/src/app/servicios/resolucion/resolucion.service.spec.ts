import { TestBed } from '@angular/core/testing';

import { ResolucionService } from './resolucion.service';

describe('ResolucionService', () => {
  let service: ResolucionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolucionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
