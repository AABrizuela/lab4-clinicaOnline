import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.scss']
})
export class HomePacienteComponent implements OnInit {

  listadoTurnos
  user;
  datosUsuario;

  constructor(public service:AuthService, public db:AngularFirestore, public router:Router, private turnosService:TurnosService) {

   }

  ngOnInit(): void {
    this.user = this.service.obtenerUsuario();
    let promise = this.db.collection('pacientes', ref => ref.where('email', '==', this.user.email));
    let observable = promise.valueChanges();
    observable.subscribe(a => this.datosUsuario = a);
    this.turnosService.getTurnosPaciente(this.user.email).then(datos=>this.listadoTurnos = datos)
    console.log(this.listadoTurnos)
  }

  logout(){
    this.service.logout();
    this.router.navigate(['login']);
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
}
