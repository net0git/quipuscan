import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparacionExpedientesInventarioComponent } from './preparacion-expedientes-inventario.component';

describe('PreparacionExpedientesInventarioComponent', () => {
  let component: PreparacionExpedientesInventarioComponent;
  let fixture: ComponentFixture<PreparacionExpedientesInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreparacionExpedientesInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreparacionExpedientesInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
