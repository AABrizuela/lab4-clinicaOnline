import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../../../services/auth.service'
import {storage} from 'firebase'
import { Profesional } from 'src/app/clases/profesional';
import { Router } from '@angular/router';
import { EspecialidadesService } from 'src/app/services/especialidades.service';

@Component({
  selector: 'app-alta-profesional',
  templateUrl: './alta-profesional.component.html',
  styleUrls: ['./alta-profesional.component.scss']
})
export class AltaProfesionalComponent implements OnInit {

  fotoUno = '../../../assets/usuDefault.png' 
  fotoDos = '../../../assets/usuDefault.png'
  usuario:Profesional
  error = false
  especialidades = []
  listadoEsp = false;

  constructor(public servicio:AuthService, public router:Router, public espService:EspecialidadesService) { 
    this.usuario = new Profesional()
  }

  ngOnInit(): void {
  }

  registrar(){
    $("#divError").css('display', 'none')
    $("#spanProf").text('')

    this.usuario.email = $("#email").val()
    this.usuario.nombre = $("#nombre").val()
    this.usuario.apellido = $("#apellido").val()
    this.usuario.pass = $("#contrasena").val()
    if(this.validarCorreo(this.usuario.email) && this.validarClave(this.usuario.pass)){
      this.usuario.perfil = 'profesional'
      this.usuario.fotoUno = 'default'
      this.usuario.fotoDos = 'default'  
      this.usuario.habilitado = false
      this.usuario.atencion = []
      this.usuario.especialidades = this.especialidades
      this.servicio.registerUser(this.usuario).catch(e=>{this.textoMostrar(e)}).then(a=>{
        this.upload()
        if(this.usuario.especialidades.length > 1)
          this.espService.subirEspecialidadesBD(this.usuario.especialidades, this.usuario)
        else
          this.espService.subirEspecialidadBD(this.usuario.especialidades[0], this.usuario)
        this.servicio.sendVerificationEmail()
        this.router.navigate(['/login'])  
      })
    }
  }

  cambiarFoto(){
    let photo = $("#fotoUno").val()
    console.log(photo)
    let photoDos = $("#fotoUno").prop('files')[0]
    console.log(photoDos)
    this.fotoUno = photoDos.webkitRelativePath
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
      $("#spanProf").text('Correo requerido')
      $("#divError").css('display', 'flex')
    }
    else
    {
      $("#spanProf").text('El campo debe ser de tipo correo')
      $("#divError").css('display', 'flex')
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
      $("#spanProf").text('Clave requerida')
      $("#divError").css('display', 'flex')
    }
    else if(pass.length < 6)
    {
      $("#spanProf").text('La clave debe ser mayor a 6 digitos')
      $("#divError").css('display', 'flex')
    }
    else
    {
      $("#spanProf").text('Contraseña no válida')
      $("#divError").css('display', 'flex')
    }

    return retorno;
  }

  textoMostrar(msj){
    switch(msj.code){
      case 'auth/weak-password':
        $("#spanProf").text('La contraseña debe tener mínimo 6 caracteres')
        $("#divError").css('display', 'flex')
        console.log('La contraseña debe tener mínimo 6 caracteres')
        break;
      case 'auth/argument-error':
        $("#spanProf").text('E-Mail o contraseña incorrectos')
        $("#divError").css('display', 'flex')
        console.log('E-Mail o contraseña incorrectos')
        break;
      case 'auth/email-already-in-use':
        $("#spanProf").text('El Email ingresado ya existe')
        $("#divError").css('display', 'flex')
        console.log('El Email ingresado ya existe')
        break;
      case "auth/invalid-email":
        $("#spanProf").text('El Email tiene un formato incorrecto')
        $("#divError").css('display', 'flex')
        console.log('El Email tiene un formato incorrecto')
        break;
      default:
        $("#spanProf").text(msj)
        $("#divError").css('display', 'flex')

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
      this.usuario.fotoUno = `profesionales/${this.usuario.email}-uno`
      refUno = storage().ref(`profesionales/${this.usuario.email}-uno`)      

      fotoDos = $('#fotoDos').prop("files")[0];
      this.usuario.fotoDos = `profesionales/${this.usuario.email}-dos`
      refDos = storage().ref(`profesionales/${this.usuario.email}-dos`)

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
          this.servicio.updateDoc('profesionales', this.usuario)
          })
        });
        })
      });
     
    }
    else if(fotoUno != ''){
      fotoUno = $('#fotoUno').prop("files")[0];
      this.usuario.fotoUno = `profesionales/${this.usuario.email}-uno`
      let refUno :any= storage().ref(`profesionales/${this.usuario.email}-uno`)      
      refUno.put(fotoUno).then( a => {
        storage().ref().child(a.ref.location.path).getDownloadURL().then((dato) =>{
          this.usuario.fotoUno = dato
          let metaDataUno = {'contentType' : fotoUno.type, 'customMetadata': {propietario: JSON.stringify(this.usuario)}}
          refUno.updateMetadata(metaDataUno).then(a=>console.log(a))
          this.servicio.updateDoc('profesionales', this.usuario)
        }) 
      })
    }
    else if(fotoDos != ''){
      fotoDos = $('#fotoDos').prop("files")[0];
      this.usuario.fotoDos = `profesionales/${this.usuario.email}-dos`
      let refDos :any= storage().ref(`profesionales/${this.usuario.email}-dos`)      
      refDos.put(fotoDos).then( a => {
        storage().ref().child(a.ref.location.path).getDownloadURL().then((dato) =>{
          this.usuario.fotoDos = dato
          let metaDataDos = {'contentType' : fotoDos.type, 'customMetadata': {propietario: JSON.stringify(this.usuario)}}
          refDos.updateMetadata(metaDataDos).then(a=>console.log(a))
          this.servicio.updateDoc('profesionales', this.usuario)
        }) 
      })
    }

  }

  agregarEspecialidades(){
    $("#divError").css('display', 'none')
    $("#spanProf").text('')
    let espUno = $("#espUno").val()
    $("#espUno").val('')
    let flag = false;
    if(espUno != ''){
      for (let esp of this.especialidades) {
        if(esp == espUno){
          flag = true;
          break;
        }
      } 
    }
    else
      flag = true;
    
    if(flag)
      this.textoMostrar('La especialidad ya existe o está vacía');
    else
      this.especialidades.push(espUno);
  }

  borrarEspecialidades(esp:string){
    let index = this.especialidades.indexOf(esp)
    this.especialidades.splice(index,1)
  }
}
