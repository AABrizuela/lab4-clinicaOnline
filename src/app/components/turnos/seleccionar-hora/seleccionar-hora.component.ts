import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-seleccionar-hora',
  templateUrl: './seleccionar-hora.component.html',
  styleUrls: ['./seleccionar-hora.component.scss']
})
export class SeleccionarHoraComponent implements OnInit {
  @Input() profesionalSeleccionadoInpt
  @Input() horariosInpt
  @Output() enviarHora : EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  lanzarHora(hora)
  {
    this.enviarHora.emit(hora);
  }
}
