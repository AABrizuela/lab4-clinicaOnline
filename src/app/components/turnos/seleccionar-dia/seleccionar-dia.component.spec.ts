import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarDiaComponent } from './seleccionar-dia.component';

describe('SeleccionarDiaComponent', () => {
  let component: SeleccionarDiaComponent;
  let fixture: ComponentFixture<SeleccionarDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarDiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
