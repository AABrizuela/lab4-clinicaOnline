import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  user
  constructor(public service:AuthService, public router:Router) { 
  }

  ngOnInit(): void {
    this.user = this.service.obtenerUsuario()
  }

  logout(){
    this.service.logout()
    this.router.navigate(['login'])
  }
}
