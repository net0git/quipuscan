import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FedatarioComponent } from './fedatario.component';

describe('FedatarioComponent', () => {
  let component: FedatarioComponent;
  let fixture: ComponentFixture<FedatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FedatarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FedatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
