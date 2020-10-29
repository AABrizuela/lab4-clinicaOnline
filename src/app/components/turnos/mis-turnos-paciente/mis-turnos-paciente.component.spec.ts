import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTurnosPacienteComponent } from './mis-turnos-paciente.component';

describe('MisTurnosPacienteComponent', () => {
  let component: MisTurnosPacienteComponent;
  let fixture: ComponentFixture<MisTurnosPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisTurnosPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTurnosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
