import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-busqueda-informacion',
  templateUrl: './busqueda-informacion.component.html',
  styleUrls: ['./busqueda-informacion.component.scss']
})
export class BusquedaInformacionComponent implements OnInit {

  palabra:string
  todosLosTurnos = []
  turnosAMostrar = []
  turnoParaDetalle
  botonHistoria='Ver Encuesta'

  constructor(private service:AuthService, private turnosService:TurnosService) { }

  ngOnInit(): void {
    this.turnosService.getTurnosProfesionalTodos().then((data:any)=>{
      for (let turnosPorProf of data) {
        for (let turno of turnosPorProf.turnos) {
          this.todosLosTurnos.push(turno)
        }
      }
    })
  }

  buscar(){
    this.turnosAMostrar = []
    this.palabra = this.palabra.toLocaleLowerCase().trim()
    if(this.palabra.length > 0){
      for (let turnito of this.todosLosTurnos) {
        if(turnito.nombrePaciente.toLocaleLowerCase().includes(this.palabra) || turnito.nombreProfesional.toLocaleLowerCase().includes(this.palabra) ||
           turnito.especialidad.toLocaleLowerCase().includes(this.palabra) || turnito.fecha.toLocaleLowerCase().includes(this.palabra) ||
           turnito.estado.toLocaleLowerCase().includes(this.palabra) || turnito.dia.toLocaleLowerCase().includes(this.palabra) || 
           turnito.horario.toLocaleLowerCase().includes(this.palabra))
          this.turnosAMostrar.push(turnito)
        else{
          if(turnito.datos != undefined){
            for(let key of Object.keys(turnito.datos)){
              if(key.toLocaleLowerCase().includes(this.palabra)){
                this.turnosAMostrar.push(turnito)
                break;
              }
            }  
          }
        }
      }
    }
  }

  cambiarInfo(){
    this.botonHistoria = this.botonHistoria == 'Ver Encuesta' ? 'Ver Historia' : 'Ver Encuesta'
  }
}