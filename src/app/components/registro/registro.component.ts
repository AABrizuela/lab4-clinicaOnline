import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registro = true;
  usuario = false;
  profesional = false;

  constructor() { }

  ngOnInit(): void {
  }

 abrirRegistro(value:string){
   switch(value){
     case 'usuario':
       this.usuario = true;
       this.registro = false;
       break;
     case 'profesional':
      this.profesional = true;
      this.registro = false;
      break;
    default:
      this.registro = true;
      this.profesional = false;
      this.usuario = false;
      break;
   }
 }

}