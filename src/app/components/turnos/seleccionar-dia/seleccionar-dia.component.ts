import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-seleccionar-dia',
  templateUrl: './seleccionar-dia.component.html',
  styleUrls: ['./seleccionar-dia.component.scss']
})
export class SeleccionarDiaComponent implements OnInit {
  @Input() profesionalSeleccionadoInpt;
  @Output() enviarDia : EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  lanzarDia(dia)
  {
    this.enviarDia.emit(dia);
  }
}
