import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore} from '@angular/fire/firestore'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.scss']
})
export class HomePacienteComponent implements OnInit {

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
