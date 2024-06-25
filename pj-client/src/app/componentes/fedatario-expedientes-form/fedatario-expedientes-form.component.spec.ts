import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FedatarioExpedientesFormComponent } from './fedatario-expedientes-form.component';

describe('FedatarioExpedientesFormComponent', () => {
  let component: FedatarioExpedientesFormComponent;
  let fixture: ComponentFixture<FedatarioExpedientesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FedatarioExpedientesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FedatarioExpedientesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
