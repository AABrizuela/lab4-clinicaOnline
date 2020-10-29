import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../../../services/auth.service'
import {storage} from 'firebase'
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent implements OnInit {

  fotoUno = '../../../assets/usuDefault.png' 
  fotoDos = '../../../assets/usuDefault.png'
  usuario:Usuario
  constructor(public servicio:AuthService, public router:Router) { 
    this.usuario = new Usuario()
  }

  ngOnInit(): void {
    this.servicio.obtenerUsuario()
  }

  registrar(){
    $("#errorEmailUsu").attr('hidden', true)
    $("#spanEmailUsu, #spanPassUsu").text('')
    $("#errorPassUsu").attr('hidden', true)

    this.usuario.nombre = $("#nombre").val()
    this.usuario.apellido = $("#apellido").val()
    this.usuario.email = $("#email").val()
    this.usuario.pass = $("#contrasena").val()
    if(this.validarCorreo(this.usuario.email) && this.validarClave(this.usuario.pass)){
      this.usuario.perfil = 'paciente'
      this.usuario.fotoUno = 'default'
      this.usuario.fotoDos = 'default'  
      this.servicio.registerUser(this.usuario).catch(e=>{this.textoMostrar(e)}).then(a=>{
        this.upload()
        this.servicio.sendVerificationEmail()
        this.router.navigate(['/login'])
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
      $("#spanEmailUsu").text('Correo requerido')
      $("#errorEmailUsu").removeAttr('hidden')
    }
    else
    {
      $("#spanEmailUsu").text('El campo debe ser de tipo correo')
      $("#errorEmailUsu").removeAttr('hidden')
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
      $("#spanPassUsu").text('Contraseña requerida')
      $("#errorPassUsu").removeAttr('hidden')
    }
    else if(pass.length < 6)
    {
      $("#spanPassUsu").text('La clave debe ser mayor a 6 digitos')
      $("#errorPassUsu").removeAttr('hidden')

    }
    else
    {
      $("#spanPassUsu").text('Contraseña no válida')
      $("#errorPassUsu").removeAttr('hidden')
    }

    return retorno;
  }

  textoMostrar(msj){
    switch(msj.code){
      case 'auth/weak-password':
        $("#spanPassUsu").text('La contraseña debe tener mínimo 6 caracteres')
        $("#errorPassUsu").removeAttr('hidden')
        console.log('La contraseña debe tener mínimo 6 caracteres')
        break;
      case 'auth/argument-error':
        $("#spanEmailUsu").text('E-Mail o contraseña incorrectos')
        $("#errorEmailUsu").removeAttr('hidden')
        $("#spanPassUsu").text('E-Mail o contraseña incorrectos')
        $("#errorPassUsu").removeAttr('hidden')
        console.log('E-Mail o contraseña incorrectos')
        break;
      case 'auth/email-already-in-use':
        $("#spanEmailUsu").text('El Email ingresado ya existe')
        $("#errorEmailUsu").removeAttr('hidden')
        console.log('El Email ingresado ya existe')
        break;
      case "auth/invalid-email":
        $("#spanEmailUsu").text('El Email tiene un formato incorrecto')
        $("#errorEmailUsu").removeAttr('hidden')
        console.log('El Email tiene un formato incorrecto')
        break;
      default:
        $("#spanEmailUsu").text(msj)
        $("#errorEmailUsu").removeAttr('hidden')
        console.log(msj)
        break;
    }
  }

  upload()
  {
    let fotoUno = $('#fotoUno').val()
    let fotoDos = $('#fotoDos').val()

    if(fotoUno != '' && fotoDos != ''){
      let refUno
      let refDos
      let metaDataUno
      let metaDataDos

      fotoUno = $('#fotoUno').prop("files")[0];
      this.usuario.fotoUno = `pacientes/${this.usuario.email}-uno`
      refUno = storage().ref(`pacientes/${this.usuario.email}-uno`)      

      fotoDos = $('#fotoDos').prop("files")[0];
      this.usuario.fotoDos = `pacientes/${this.usuario.email}-dos`
      refDos = storage().ref(`pacientes/${this.usuario.email}-dos`)

      refUno.put(fotoUno).then( a => {
        storage().ref().child(a.ref.location.path).getDownloadURL().then((dato) =>{
         this.usuario.fotoUno = dato
         refDos.put(fotoDos).then( a => {
          storage().ref().child(a.ref.location.path).getDownloadURL().then((dato) =>{
           this.usuario.fotoDos = dato
          metaDataUno = {'contentType' : fotoUno.type, 'customMetadata': {propietario: JSON.stringify(this.usuario)}}
          refUno.updateMetadata(metaDataUno).then(a=>console.log(a))
          metaDataDos = {'contentType' : fotoDos.type, 'customMetadata': {propietario: JSON.stringify(this.usuario)}}
          refDos.updateMetadata(metaDataDos).then(a=>console.log(a))
          this.servicio.updateDoc('pacientes', this.usuario)
          })
        });
        })
      });
     
    }
    else if(fotoUno != ''){
      fotoUno = $('#fotoUno').prop("files")[0];
      this.usuario.fotoUno = `pacientes/${this.usuario.email}-uno`
      let refUno :any= storage().ref(`pacientes/${this.usuario.email}-uno`)      
      refUno.put(fotoUno).then( a => {
        storage().ref().child(a.ref.location.path).getDownloadURL().then((dato) =>{
          this.usuario.fotoUno = dato
          let metaDataUno = {'contentType' : fotoUno.type, 'customMetadata': {propietario: JSON.stringify(this.usuario)}}
          refUno.updateMetadata(metaDataUno).then(a=>console.log(a))
          this.servicio.updateDoc('pacientes', this.usuario)
        }) 
      })
    }
    else if(fotoDos != ''){
      fotoDos = $('#fotoDos').prop("files")[0];
      this.usuario.fotoDos = `pacientes/${this.usuario.email}-dos`
      let refDos :any= storage().ref(`pacientes/${this.usuario.email}-dos`)      
      refDos.put(fotoDos).then( a => {
        storage().ref().child(a.ref.location.path).getDownloadURL().then((dato) =>{
          this.usuario.fotoDos = dato
          let metaDataDos = {'contentType' : fotoDos.type, 'customMetadata': {propietario: JSON.stringify(this.usuario)}}
          refDos.updateMetadata(metaDataDos).then(a=>console.log(a))
          this.servicio.updateDoc('pacientes', this.usuario)
        }) 
      })
    }

  }
}
