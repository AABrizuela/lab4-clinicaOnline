import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user;
  profile;

  constructor(public service: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.profile = localStorage.getItem('perfilUser');
  }

  logout(){
    this.service.logout();
    this.router.navigate(['login']);
  }

  goToHome(){
    if(this.profile == 'paciente') {
      this.router.navigate(['/home']);
    }
    else if(this.profile == 'profesional') {
      this.router.navigate(['/home/profesional']);
 }
    else if(this.profile == 'admin') {
      this.router.navigate(['/home/admin']);
 }
  }

}
