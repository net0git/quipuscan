import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndizadorComponent } from './indizador.component';

describe('IndizadorComponent', () => {
  let component: IndizadorComponent;
  let fixture: ComponentFixture<IndizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndizadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
