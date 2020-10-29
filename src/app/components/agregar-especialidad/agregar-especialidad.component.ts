import { Component, OnInit } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as $ from 'jquery';
import { EspecialidadesService } from 'src/app/services/especialidades.service';

@Component({
  selector: 'app-agregar-especialidad',
  templateUrl: './agregar-especialidad.component.html',
  styleUrls: ['./agregar-especialidad.component.scss']
})
export class AgregarEspecialidadComponent implements OnInit {

  profToUpdate:Profesional
  update = false
  user
  listado:Profesional[]
  constructor(public service:AuthService, public router:Router, public db :AngularFirestore, public espService:EspecialidadesService) {
    let collection = this.db.collection('profesionales')
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

  agregar(){
    $(".error").css('display', 'none')
    $(".error").text('')
    let espUno = $("#espUno").val()
    $("#espUno").val('')
    let flag = false;
    if(espUno != ''){
      for (let esp of this.profToUpdate.especialidades) {
        if(esp == espUno){
          flag = true;
          break;
        }
      } 
    }
    else
      flag = true;
    
    if(flag){
      $(".error").text('La especialidad ya existe o está vacía');
      $(".error").css('display', 'flex')
    }
    else{
      this.profToUpdate.especialidades.push(espUno);
      this.db.collection('profesionales').doc(this.profToUpdate.email).update(this.profToUpdate)
      this.espService.subirEspecialidadBD(espUno, this.profToUpdate)
      this.espService.updateEnTodosLados(this.profToUpdate)
      this.update = false
    }
    
  }

  mostrarUpdate(profesional:Profesional){
    this.profToUpdate = profesional;
    this.update = true
  }

  borrarEspecialidades(esp:string){
    this.espService.borrarEspecialidadBD(esp, this.profToUpdate)
    
  }

}
