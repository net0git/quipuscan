import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesInventarioComponent } from './expedientes-inventario.component';

describe('ExpedientesInventarioComponent', () => {
  let component: ExpedientesInventarioComponent;
  let fixture: ComponentFixture<ExpedientesInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedientesInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedientesInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
