import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparacionDocumentosComponent } from './preparacion-documentos.component';

describe('PreparacionDocumentosComponent', () => {
  let component: PreparacionDocumentosComponent;
  let fixture: ComponentFixture<PreparacionDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreparacionDocumentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreparacionDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
