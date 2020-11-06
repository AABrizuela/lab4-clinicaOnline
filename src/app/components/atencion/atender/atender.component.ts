import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TurnosService } from 'src/app/services/turnos.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-atender',
  templateUrl: './atender.component.html',
  styleUrls: ['./atender.component.scss']
})
export class AtenderComponent implements OnInit {

  user;
  listaDeTurnos;
  edad;
  temperatura;
  peso;
  estatura;
  presion;
  dato;
  valor;
  turnoSeleccionado = null;
  atencion = false;
  contador: number;
  datosAgregados = [];
  encuesta = false;
  constructor(private service: AuthService, private router: Router, private turnosService: TurnosService) { }

  ngOnInit(): void {
    this.user = this.service.obtenerUsuario();
    this.turnosService.getTurnoProfesional(this.user.email).then(data => this.listaDeTurnos = data);
    this.contador = 0;
  }

  logout(){
    this.service.logout();
    this.router.navigate(['login']);
  }


  finalizarTurno(flag: boolean)
  {
    if (flag){
      this.atencion = false;
      this.encuesta = false;
      let i = this.listaDeTurnos.turnos.indexOf(this.turnoSeleccionado);
      this.listaDeTurnos.turnos[i] = this.turnoSeleccionado;
      this.listaDeTurnos.turnos[i].estado = 'atendido';
      this.agregarDatos();
      this.turnosService.updateTurnos('turnos-profesionales', this.user.email, this.listaDeTurnos);
      this.turnosService.updateTurnos('turnos-pacientes', this.turnoSeleccionado.paciente, this.listaDeTurnos);
    }
    else{
      this.encuesta = false;
    }
  }

  agregarNuevoDato()
  {
    if (this.contador < 3){
      this.datosAgregados.push({nombre: this.dato, valor : this.valor});
      this.contador++;
    }
    else{
      console.error('solo podes agregar 3');
      this.actvError();
    }

    (document.querySelector('[name=\'dato\']') as HTMLInputElement).value = '';
    (document.querySelector('[name=\'valor\']') as HTMLInputElement).value = '';
  }

  agregarDatos()
  {
    this.datosAgregados.push({nombre: 'temperatura', valor : this.temperatura});
    this.datosAgregados.push({nombre: 'peso', valor : this.peso});
    this.datosAgregados.push({nombre: 'estatura', valor : this.estatura});
    this.datosAgregados.push({nombre: 'presion', valor : this.presion});
    this.datosAgregados.push({nombre: 'edad', valor : this.edad});
    this.turnoSeleccionado.datos = this.datosAgregados;
  }

  actvError(){
    $('#errorAtencion').fadeIn();
    setTimeout(() => {
      $('#errorAtencion').fadeOut();
    }, 2000);
  }
}
