import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosRecibidosComponent } from './turnos-recibidos.component';

describe('TurnosRecibidosComponent', () => {
  let component: TurnosRecibidosComponent;
  let fixture: ComponentFixture<TurnosRecibidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosRecibidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosRecibidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
