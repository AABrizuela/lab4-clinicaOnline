import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarHoraComponent } from './seleccionar-hora.component';

describe('SeleccionarHoraComponent', () => {
  let component: SeleccionarHoraComponent;
  let fixture: ComponentFixture<SeleccionarHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarHoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
