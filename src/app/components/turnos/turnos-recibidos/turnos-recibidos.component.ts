import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery'
import { Router } from '@angular/router';

@Component({
  selector: 'app-turnos-recibidos',
  templateUrl: './turnos-recibidos.component.html',
  styleUrls: ['./turnos-recibidos.component.scss']
})
export class TurnosRecibidosComponent implements OnInit {

  listadoTurnos
  current
  cancelo = false
  turnoCancelado

  constructor( private router:Router, private turnosService:TurnosService, private service:AuthService) { }

  ngOnInit(): void {
    this.current = this.service.obtenerUsuario()
    this.turnosService.getTurnoProfesional(this.current.email).then(data=>this.listadoTurnos = data)
  }

    logout(){
    this.service.logout()
    this.router.navigate(['login'])
  }


  aceptarTurno(data){
    for(let item of this.listadoTurnos.turnos)
    {
      if(item.fecha == data.fecha && item.horario == data.horario && item.profesional == data.profesional)
      {
        item.estado = 'aceptado';
        this.turnosService.updateTurnos("turnos-profesionales", data.profesional, this.listadoTurnos);
        this.turnosService.updateTurnos("turnos-pacientes", data.paciente, this.listadoTurnos);
        break;
      }
    }  
  }

  cancelarTurno(){
    let motivo = $("#motivo").val()
    for(let item of this.listadoTurnos.turnos)
    {
      if(item.fecha == this.turnoCancelado.fecha && item.horario == this.turnoCancelado.horario && item.profesional == this.turnoCancelado.profesional)
      {
        item.estado = 'cancelado';
        item.motivoCancelado = motivo
        this.turnosService.updateTurnos("turnos-profesionales", this.turnoCancelado.profesional, this.listadoTurnos);
        this.turnosService.updateTurnos("turnos-pacientes", this.turnoCancelado.paciente, this.listadoTurnos);
        break;
      }
    }  

    this.cancelo = false
  }

  evaluarEstado(estado:string){
    if(estado == 'pendiente')
      $("#tdEstado").addClass('estadoPendiente');
    else if(estado == 'aceptado')
      $("#tdEstado").addClass('estadoAceptado');
    else if(estado == 'cancelado')
    $("#tdEstado").addClass('estadoCancelado');
  }
}
