import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndizadorExpedienteComponent } from './indizador-expediente.component';

describe('IndizadorExpedienteComponent', () => {
  let component: IndizadorExpedienteComponent;
  let fixture: ComponentFixture<IndizadorExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndizadorExpedienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndizadorExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
