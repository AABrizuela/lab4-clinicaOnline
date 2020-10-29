import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery'
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-turnos-paciente',
  templateUrl: './mis-turnos-paciente.component.html',
  styleUrls: ['./mis-turnos-paciente.component.scss']
})
export class MisTurnosPacienteComponent implements OnInit {

  listadoTurnos
  current
  motivoDeTurnos = false
  motivoStr

  constructor(private router:Router,private turnosService:TurnosService, private service:AuthService) { }

  ngOnInit(): void {
    this.current = this.service.obtenerUsuario()
    this.turnosService.getTurnosPaciente(this.current.email).then(datos=>this.listadoTurnos = datos)
  }

  logout(){
    this.service.logout()
    this.router.navigate(['login'])
  }

  cancelarTurno(data){
    for(let item of this.listadoTurnos.turnos)
    {
      if(item.fecha == data.fecha && item.horario == data.horario && item.profesional == data.profesional)
      {
        item.estado = 'cancelado';
        this.turnosService.updateTurnos("turnos-profesionales", data.profesional, this.listadoTurnos);
        this.turnosService.updateTurnos("turnos-pacientes", data.paciente, this.listadoTurnos);
        break;
      }
    }  
  }

  botonResena(turno){
    return turno.estado == 'atendido' ? true : false
  }

  botonEncuesta(turno){
    return turno.encuesta || !this.botonResena(turno) ? false : true
  }

  mostrarMotivo(turno){
    this.motivoDeTurnos = true
    this.motivoStr = turno.motivoCancelado
  }
}
