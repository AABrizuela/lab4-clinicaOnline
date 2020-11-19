import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-seleccionar-fecha',
  templateUrl: './seleccionar-fecha.component.html',
  styleUrls: ['./seleccionar-fecha.component.scss']
})
export class SeleccionarFechaComponent implements OnInit {
  @Input() profesionalSeleccionadoInpt
  @Input() quinceDiasInpt
  @Output() enviarFecha : EventEmitter<any> = new EventEmitter<any>()

  constructor() {

  }

  ngOnInit(): void {
  }

  lanzarFecha(fecha)
  {
    this.enviarFecha.emit(fecha);
  }


}
