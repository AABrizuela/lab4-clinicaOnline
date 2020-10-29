import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.scss']
})
export class SacarTurnoComponent implements OnInit {

  profParaTurno
  current

  constructor(private service:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.current = this.service.obtenerUsuario()
  }

    logout(){
    this.service.logout()
    this.router.navigate(['login'])
  }


}
