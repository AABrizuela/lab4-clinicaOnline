import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  @Input() input_encuesta:any
  @Input() tipoUsuario:string
  @Output() output_encuesta:EventEmitter<any> = new EventEmitter<any>()
  cometario:string;
  checkbox = [];
  radio : string;
  datos:any = [];
  turnos:any = [];

  constructor(private servicio:TurnosService){}

  ngOnInit(): void {
  }

  cargarEncuesta()
  {
    this.getRadio();
    this.getCheckbox();
    this.getComentario();
    this.guardarDatos()
    if(this.tipoUsuario == 'profesional')
      this.input_encuesta.encuesta = {datos: this.datos, comentario: this.cometario};
    else if(this.tipoUsuario == 'paciente')
      this.input_encuesta.encuestaPaciente = {datos: this.datos, comentario: this.cometario};

    this.turnos.turnos[this.getIndex()] = this.input_encuesta
    this.servicio.updateTurnos("turnos-profesionales",this.input_encuesta.profesional,this.turnos);
    this.servicio.updateTurnos("turnos-pacientes",this.input_encuesta.paciente,this.turnos);
  }

  getRadio()
  {
    let aux_radio:any= document.querySelectorAll('input[type=radio]');

    for(let item of aux_radio)
    {
      if(item.checked)
      {
        this.radio = item.value;
        break;
      }
    }
  }

  getCheckbox()
  {
    let aux_check:any= document.querySelectorAll('input[type=checkbox]');

    for(let item of aux_check)
    {
      if(item.checked)
      {
        this.checkbox.push(item.value);
      }
    }
  }

  getComentario()
  {
    this.cometario = (<HTMLInputElement>document.querySelector('#encuesta-textarea')).value;
  }

  guardarDatos() : any[]
  {
    this.datos.push({nombre : "satisfecho" , valor : this.radio})
    this.datos.push({nombre : "modalidad" , valor : this.checkbox})
    return this.datos;
  }

  subirEncuesta()
  {
    this.servicio.getTurnoProfesional(this.input_encuesta.profesional).then((turnos) => {
      this.turnos = turnos;
      this.cargarEncuesta();
      this.output_encuesta.emit(true)
    })
  }

  getIndex()
  {
    let index : number = 0;

    for(index; index < this.turnos.turnos.length; index++)
    {
      if(this.turnos.turnos[index].horario == this.input_encuesta.horario && this.turnos.turnos[index].fecha == this.input_encuesta.fecha)
      {
        break;
      }
    }

    return index;
  }

}
