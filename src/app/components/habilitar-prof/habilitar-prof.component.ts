import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Profesional } from 'src/app/clases/profesional';
import { AngularFirestore } from '@angular/fire/firestore';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-habilitar-prof',
  templateUrl: './habilitar-prof.component.html',
  styleUrls: ['./habilitar-prof.component.scss']
})
export class HabilitarProfComponent implements OnInit {

  user
  listado:Profesional[]
  constructor(public service:AuthService, public router:Router, public db :AngularFirestore, public espService:EspecialidadesService, private turnosService:TurnosService) {
    let collection = this.db.collection('profesionales', ref => { return ref.where('habilitado', '==', false)})
    let observable = collection.valueChanges()
    observable.subscribe((datos:Profesional[])=>this.listado = datos)
  }

  ngOnInit(): void {
    this.user = this.service.obtenerUsuario()
  }

  logout(){
    this.service.logout()
    this.router.navigate(['login'])
  }

  habilitar(profesional:Profesional){
    profesional.habilitado = true;
    this.db.collection('profesionales').doc(profesional.email).update(profesional)
    this.espService.updateEnTodosLados(profesional)
    this.turnosService.altaProfesional(profesional.email, `${profesional.nombre}  ${profesional.apellido}`)
  }
}
