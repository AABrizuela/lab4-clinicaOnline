import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { Profesional } from 'src/app/clases/profesional';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.scss']
})
export class AltaTurnoComponent implements OnInit {

  sabado:boolean = false
  email:string
  user:Profesional
  observable
  hours = {desde: '8:00', hasta: '18:00', duracion: 30}
  sabHours = {desde: '8:00', hasta: '18:00', duracion: 30}
  currentUser

  constructor(private router:Router, private service : AuthService, private db:AngularFirestore, private espService:EspecialidadesService) { }

  ngOnInit(): void {
    this.currentUser = this.service.obtenerUsuario()
    this.email = this.currentUser.email
      this.observable = this.db.collection('profesionales').doc(this.email).valueChanges()
      this.observable.subscribe(datos=>{this.user = datos})
  }

  logout(){
    this.service.logout()
    this.router.navigate(['login'])
  }

  guardar(){
    this.getHours()
    this.user.atencion = this.getDays()
    this.service.updateDoc('profesionales', this.user)
    this.subirASemana()
    this.espService.updateEsp(this.user)
    this.espService.updateStorage(this.user)
  }

  getHours(){
    this.hours.desde = $("#horaDesde").val()
    this.hours.hasta = $("#horaHasta").val()

    if(this.sabado){
      this.sabHours.desde = $("#horaSabDesde").val()
      this.sabHours.hasta = $("#horaSabHasta").val()
    }
  }

  getDays(){
    let lunes = $("#lunes").is(':checked')
    let martes = $("#martes").is(':checked')
    let miercoles = $("#miercoles").is(':checked')
    let jueves = $("#jueves").is(':checked')
    let viernes = $("#viernes").is(':checked')
    let sabado = $("#sabado").is(':checked')
    let duracion = $("#duracion").val()
    let array = []

    if(lunes){
      array.push({dia:'lunes',desde:this.hours.desde,hasta:this.hours.hasta, duracion: Number.parseInt(duracion)})
    }
    if(martes){
      array.push({dia:'martes',desde:this.hours.desde,hasta:this.hours.hasta, duracion: Number.parseInt(duracion)})
    }
    if(miercoles){
      array.push({dia:'miercoles',desde:this.hours.desde,hasta:this.hours.hasta, duracion: Number.parseInt(duracion)})
    }
    if(jueves){
      array.push({dia:'jueves',desde:this.hours.desde,hasta:this.hours.hasta, duracion: Number.parseInt(duracion)})
    }
    if(viernes){
      array.push({dia:'viernes',desde:this.hours.desde,hasta:this.hours.hasta, duracion: Number.parseInt(duracion)})
    }
    if(sabado){
      array.push({dia:'sabado',desde:this.sabHours.desde,hasta:this.sabHours.hasta, duracion: Number.parseInt(duracion)})
    }

   return array;
  }

  eligioSabado(){
    this.sabado = this.sabado ? false : true
  }

  subirASemana(){
    let lunesFlag = $("#lunes").is(':checked')
    let martes = $("#martes").is(':checked')
    let miercoles = $("#miercoles").is(':checked')
    let jueves = $("#jueves").is(':checked')
    let viernes = $("#viernes").is(':checked')
    let sabado = $("#sabado").is(':checked')

    let collection = this.db.collection('semana')

    if(lunesFlag){
      let lunesObs = collection.doc('lunes').valueChanges()
      let lunes
      let subLunes =lunesObs.subscribe(datos=>{
        lunes=datos
        lunes.profesionales.push(this.user)
        collection.doc('lunes').update(lunes)  
        subLunes.unsubscribe()
      })
      
    }
    if(martes){
      let lunesObs = collection.doc('martes').valueChanges()
      let lunes
      let subMartes = lunesObs.subscribe(datos=>{
        lunes=datos
        lunes.profesionales.push(this.user)
        collection.doc('martes').update(lunes)  
        subMartes.unsubscribe()
      })
    }
    if(miercoles){
      let lunesObs = collection.doc('miercoles').valueChanges()
      let lunes
      let subMiercoles = lunesObs.subscribe(datos=>{
        lunes=datos
        lunes.profesionales.push(this.user)
        collection.doc('miercoles').update(lunes)  
        subMiercoles.unsubscribe()
      })
    }
    if(jueves){
      let lunesObs = collection.doc('jueves').valueChanges()
      let lunes
      let subJueves = lunesObs.subscribe(datos=>{
        lunes=datos
        lunes.profesionales.push(this.user)
        collection.doc('jueves').update(lunes)  
        subJueves.unsubscribe()
      })
    }
    if(viernes){
      let lunesObs = collection.doc('viernes').valueChanges()
      let lunes
      let subviernes =lunesObs.subscribe(datos=>{
        lunes=datos
        lunes.profesionales.push(this.user)
        collection.doc('viernes').update(lunes) 
        subviernes.unsubscribe() 
      })
    }
    if(sabado){
      let lunesObs = collection.doc('sabado').valueChanges()
      let lunes
      let subSabado = lunesObs.subscribe(datos=>{
        lunes=datos
        lunes.profesionales.push(this.user)
        collection.doc('sabado').update(lunes) 
        subSabado.unsubscribe() 
      })
    }
  }

  /* subirAEspecialidad(){
    console.log(this.user)
    for (let esp of this.user.especialidades) {
      console.log(esp)
      let collection = this.db.collection('especialidad')
      let obs = collection.doc(esp).valueChanges()
      
      let sub = obs.subscribe((datos:any)=>{
        console.log(datos)
        datos.profesionales.push(this.user)
        collection.doc(esp).update(datos)  
        sub.unsubscribe()
      })
    }
  } */
}
