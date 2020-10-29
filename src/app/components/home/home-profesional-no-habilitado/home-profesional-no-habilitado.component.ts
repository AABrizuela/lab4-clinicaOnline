import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-home-profesional-no-habilitado',
  templateUrl: './home-profesional-no-habilitado.component.html',
  styleUrls: ['./home-profesional-no-habilitado.component.scss']
})
export class HomeProfesionalNoHabilitadoComponent implements OnInit {

  user
  datosUsuario
  constructor(public service:AuthService, public db:AngularFirestore, public router:Router) { }

  ngOnInit(): void {
    this.user = this.service.obtenerUsuario()
    let promise = this.db.collection('profesionales', ref=>{return ref.where('email', '==', this.user.email)})
    let observable = promise.valueChanges()
    observable.subscribe(a=>this.datosUsuario = a)
  }

  logout(){
    this.service.logout()
    this.router.navigate(['login'])
  }


}
