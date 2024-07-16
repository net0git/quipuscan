import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCalidadExpedienteFormComponent } from './control-calidad-expediente-form.component';

describe('ControlCalidadExpedienteFormComponent', () => {
  let component: ControlCalidadExpedienteFormComponent;
  let fixture: ComponentFixture<ControlCalidadExpedienteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlCalidadExpedienteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlCalidadExpedienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
