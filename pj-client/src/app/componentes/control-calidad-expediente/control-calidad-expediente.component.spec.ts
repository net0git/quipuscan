import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCalidadExpedienteComponent } from './control-calidad-expediente.component';

describe('ControlCalidadExpedienteComponent', () => {
  let component: ControlCalidadExpedienteComponent;
  let fixture: ComponentFixture<ControlCalidadExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlCalidadExpedienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlCalidadExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
