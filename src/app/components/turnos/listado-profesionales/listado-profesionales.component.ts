import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { isArray } from 'util';

@Component({
  selector: 'app-listado-profesionales',
  templateUrl: './listado-profesionales.component.html',
  styleUrls: ['./listado-profesionales.component.scss']
})
export class ListadoProfesionalesComponent implements OnInit {

  @Output() output_listado_prof:EventEmitter<any> = new EventEmitter<any>()

  profesionales
  especialidades
  especialidadesParaTabla
  semana
  listadoMostrar
  profParaTurno

  dias = ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  constructor(private servicio:AuthService) { }

  ngOnInit(): void {
    this.servicio.getBD('profesionales').then((datos)=> { 
      this.profesionales = datos;
    });

    this.servicio.getBD('especialidad').then((datos:any) => {
      this.especialidades = datos
      this.especialidadesParaTabla = datos
      let index
      for (let esp of this.especialidades) {
        if(isArray(esp.nombre)){
          index = this.especialidades.indexOf(esp)
          break;
        }
      }
      this.especialidadesParaTabla.splice(index,1)
    })

    this.servicio.getBD('semana').then((datos) => {
      this.semana = datos;
    })
  }

  filtrarApellido()
  {
    this.listadoMostrar = "listado-apellido"
  }
  filtrarEspecialidades()
  {
    this.listadoMostrar = "listado-especialidades"
  }

  filtrarSemana()
  {
    this.listadoMostrar = "listado-semana"
  }

  profParaSacarTurno(prof){
    this.output_listado_prof.emit(prof)
  }
}