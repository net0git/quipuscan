import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparacionExpedientesFormularioComponent } from './preparacion-expedientes-formulario.component';

describe('PreparacionExpedientesFormularioComponent', () => {
  let component: PreparacionExpedientesFormularioComponent;
  let fixture: ComponentFixture<PreparacionExpedientesFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreparacionExpedientesFormularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreparacionExpedientesFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
