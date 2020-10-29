import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Admin } from 'src/app/clases/admin';
import * as $ from 'jquery'

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss']
})
export class AltaAdminComponent implements OnInit {
 
  user
  usuario:Admin
  constructor(public servicio:AuthService, public router:Router) { }

  ngOnInit(): void {
    this.usuario = new Admin()
    this.user = this.servicio.obtenerUsuario()

  }

  registrar(){
    $("#errorEmailAdmin").attr('hidden', true)
    $("#spanEmailAdmin, #spanPassAdmin").text('')
    $("#errorPassAdmin").attr('hidden', true)

    this.usuario.email = $("#email").val()
    this.usuario.pass = $("#contrasena").val()
    if(this.validarCorreo(this.usuario.email) && this.validarClave(this.usuario.pass)){
      this.usuario.perfil = 'admin'
      this.servicio.registerUser(this.usuario).catch(e=>{this.textoMostrar(e)}).then(a=>{
        console.log(a)
        this.servicio.sendVerificationEmail()
        this.router.navigate(['/home/admin'])
      })
    }
  }

  logout(){
    this.servicio.logout()
    this.router.navigate(['login'])
  }

  validarCorreo(email) : boolean
  {
    let retorno = false;
    let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i;

    if(regex.test(email))
    {
      retorno = true;
    }
    else if(email == "")
    {
      $("#spanEmailAdmin").text('Correo requerido')
      $("#errorEmailAdmin").removeAttr('hidden')
    }
    else
    {
      $("#spanEmailAdmin").text('El campo debe ser de tipo correo')
      $("#errorEmailAdmin").removeAttr('hidden')
    }

    return retorno;
  }

  validarClave(pass:string) : boolean
  {
    let retorno = false

    if(pass.length >= 6)
    {
        retorno = true;
    }
    else if(pass == "")
    {
      $("#spanPassAdmin").text('Contraseña requerida')
      $("#errorPassAdmin").removeAttr('hidden')
    }
    else if(pass.length < 6)
    {
      $("#spanPassAdmin").text('La clave debe ser mayor a 6 digitos')
      $("#errorPassAdmin").removeAttr('hidden')
    }
    else
    {
      $("#spanPassAdmin").text('Contraseña no válida')
      $("#errorPassAdmin").removeAttr('hidden')
    }

    return retorno;
  }

  textoMostrar(msj){
    switch(msj.code){
      case 'auth/weak-password':
        $("#spanPassAdmin").text('La contraseña debe tener mínimo 6 caracteres')
        $("#errorPassAdmin").removeAttr('hidden')
        console.log('La contraseña debe tener mínimo 6 caracteres')
        break;
      case 'auth/argument-error':
        $("#spanEmailAdmin").text('E-Mail o contraseña incorrectos')
        $("#errorEmailAdmin").removeAttr('hidden')
        $("#spanPassAdmin").text('E-Mail o contraseña incorrectos')
        $("#errorPassAdmin").removeAttr('hidden')
        console.log('E-Mail o contraseña incorrectos')
        break;
      case 'auth/email-already-in-use':
        $("#spanEmailAdmin").text('El Email ingresado ya existe')
        $("#errorEmailAdmin").removeAttr('hidden')
        console.log('El Email ingresado ya existe')
        break;
      case "auth/invalid-email":
        $("#spanEmailAdmin").text('El Email tiene un formato incorrecto')
        $("#errorEmailAdmin").removeAttr('hidden')
        console.log('El Email tiene un formato incorrecto')
        break;
      default:
        $("#spanEmailAdmin").text(msj)
        $("#errorEmailAdmin").removeAttr('hidden')
        console.log(msj)
        break;
    }
  }

}
