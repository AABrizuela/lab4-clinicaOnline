import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery'
import { Router } from '@angular/router';
import { Admin } from 'src/app/clases/admin';
import { Profesional } from 'src/app/clases/profesional';
import { Usuario } from 'src/app/clases/usuario';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public service : AuthService, public router:Router, public db:AngularFirestore) { }

  ngOnInit(): void {
    $("#botones").css('display', 'flex')
    $("#spinner").css('display', 'none')         
    this.service.obtenerUsuario()
  }

  luqui(){
    this.service.loginEmail('lucashulej@gmail.com', '270699').then(a=>    this.service.sendVerificationEmail()
    )
  }

  ingresar(){
    $("#errorEmail").attr('hidden', true)
    $("#spanEmail, #spanPass").text('')
    $("#errorPass").attr('hidden', true)
    let email = $("#email").val()
    let contrasena = $("#contrasena").val()
    if(this.validarCorreo(email) && this.validarClave(contrasena)){
      this.service.loginEmail(email, contrasena).catch(e=>{this.textoMostrar(e);this.service.logout();}).then(a=>{
        if(this.service.isEmailVerified() || email == 'admin@admin.com' || email == 'paciente@paciente.com' || email == 'profesional@profesional.com'){
          $("#botones").css('display', 'none')
          $("#spinner").css('display', 'inline-block')     
          setTimeout(() => {
            this.goToHome(email, contrasena)
          }, 1500);    
        }
        else{
          this.service.logout()
          this.textoMostrar('E-Mail no verificado')
        }
      })
    }
  }

  validarCorreo(email) : boolean
  {
    let retorno = false;
    let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i;
    
    if(regex.test(email))
    {
      retorno = true;
    }
    else if(email == '')
    {
      $("#spanEmail").text('Correo requerido')
      $("#errorEmail").removeAttr('hidden')
    }
    else
    {
      $("#spanEmail").text('El campo debe ser de tipo correo')
      $("#errorEmail").removeAttr('hidden')
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
      $("#spanPass").text('Contraseña requerida')
      $("#errorPass").removeAttr('hidden')
    }
    else if(pass.length < 6)
    {
      $("#spanPass").text('La clave debe ser mayor a 6 digitos')
      $("#errorPass").removeAttr('hidden')
    }
    else
    {
      $("#spanPass").text('Contraseña no válida')
      $("#errorPass").removeAttr('hidden')
    }

    return retorno;
  }

  textoMostrar(msj){
    switch(msj.code){
      case "auth/user-not-found":
        $("#spanEmail").text('El E-Mail no fue encontrado')
        $("#errorEmail").removeAttr('hidden')
        console.log('El E-Mail no fue encontrado');
        break;
      case "auth/argument-error":
        $("#spanEmail").text('E-Mail o contraseña incorrectos')
        $("#errorEmail").removeAttr('hidden')
        $("#spanPass").text('E-Mail o contraseña incorrectos')
        $("#errorPass").removeAttr('hidden')
        console.log('E-Mail o contraseña incorrectos')
        break;
      case "auth/wrong-password":
        $("#spanPass").text('La contraseña es incorrecta')
        $("#errorPass").removeAttr('hidden')
        console.log('La contraseña es incorrecta')
      case "auth/invalid-email":
        $("#spanEmail").text('El E-Mail tiene un formato incorrecto')
        $("#errorEmail").removeAttr('hidden')
        console.log('El E-Mail tiene un formato incorrecto')
        break;
      default:
        $("#spanEmail").text(msj)
        $("#errorEmail").removeAttr('hidden')
        console.log(msj)
        break;
    }
  }

  async goToHome(email:string, pass:string){
    console.log('entro auth')
    let pacienteObservable = this.db.collection('pacientes').valueChanges()
    let profile:string
    await pacienteObservable.subscribe((listado:Usuario[])=>{
      console.log('entro sus paciente')

      for (let paciente of listado) {
        if(paciente.email == email && paciente.pass == pass){
          profile = paciente.perfil;
          this.router.navigate(['home']);
          break;
        }
      }

      if(profile == undefined){
        let profesionalObservable = this.db.collection('profesionales').valueChanges()
         profesionalObservable.subscribe((listado:Profesional[])=>{
          console.log('entro sus prof')
  
          for (let profesional of listado) {
            if(profesional.email == email && profesional.pass == pass){
              profile = profesional.perfil;
              this.router.navigate(['home/profesional'])
              break;
            }
          }      

          if(profile == undefined){
            let adminObservable = this.db.collection('admins').valueChanges()
             adminObservable.subscribe((listado:Admin[])=>{
              console.log('entro sus admin')
      
              for (let admin of listado) {
                if(admin.email == email && admin.pass == pass){
                  profile = admin.perfil;
                  this.router.navigate(['home/admin']);
                  break;
                }
              }
            })
          }
        })
      }
    })
  }

  cargar(usuario:string){
    switch(usuario){
      case 'admin':
        $("#email").val('admin@admin.com')
        $("#contrasena").val('123456')
        break;
      case 'profesional':
         $("#email").val('profesional@profesional.com')
         $("#contrasena").val('123456')
         break;
      case 'paciente':
        $("#email").val('paciente@paciente.com')
        $("#contrasena").val('123456')
        break;
    }
  }

}
