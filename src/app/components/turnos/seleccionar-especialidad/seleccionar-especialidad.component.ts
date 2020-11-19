import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-seleccionar-especialidad',
  templateUrl: './seleccionar-especialidad.component.html',
  styleUrls: ['./seleccionar-especialidad.component.scss']
})
export class SeleccionarEspecialidadComponent implements OnInit {
  @Input() profesionalSeleccionadoInpt;
  @Output() enviarEspecialidad : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  lanzarEspecialidad(especialidad)
  {
    this.enviarEspecialidad.emit(especialidad);
  }
}
