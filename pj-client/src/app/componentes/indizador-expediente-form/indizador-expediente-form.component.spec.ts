import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndizadorExpedienteFormComponent } from './indizador-expediente-form.component';

describe('IndizadorExpedienteFormComponent', () => {
  let component: IndizadorExpedienteFormComponent;
  let fixture: ComponentFixture<IndizadorExpedienteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndizadorExpedienteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndizadorExpedienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
