import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({email: new FormControl(''), password: new FormControl(''), inicioRapido: new FormControl('')});

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  OnSubmitLogin()
  {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(res => {
      this.router.navigate(['/home']);
    }).catch(err => alert('Usuario o Contraseña incorrectas'));
  }
}
