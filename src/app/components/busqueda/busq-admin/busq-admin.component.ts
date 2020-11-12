import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-busq-admin',
  templateUrl: './busq-admin.component.html',
  styleUrls: ['./busq-admin.component.scss']
})
export class BusqAdminComponent implements OnInit {

  user

  constructor(public servicio:AuthService, public router:Router) { }

  ngOnInit(): void {
      this.user = this.servicio.obtenerUsuario()
  }

  logout(){
    this.servicio.logout()
    this.router.navigate(['login'])
  }


}
