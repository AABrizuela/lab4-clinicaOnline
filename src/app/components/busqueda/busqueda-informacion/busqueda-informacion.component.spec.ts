import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaInformacionComponent } from './busqueda-informacion.component';

describe('BusquedaInformacionComponent', () => {
  let component: BusquedaInformacionComponent;
  let fixture: ComponentFixture<BusquedaInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
