import { TestBed } from '@angular/core/testing';

import { ControlCalidadService } from './control-calidad.service';

describe('ControlCalidadService', () => {
  let service: ControlCalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlCalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
