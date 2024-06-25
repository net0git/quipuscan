import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalizacionExpedientesComparacionComponent } from './digitalizacion-expedientes-comparacion.component';

describe('DigitalizacionExpedientesComparacionComponent', () => {
  let component: DigitalizacionExpedientesComparacionComponent;
  let fixture: ComponentFixture<DigitalizacionExpedientesComparacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalizacionExpedientesComparacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalizacionExpedientesComparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
