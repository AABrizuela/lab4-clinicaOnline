import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery'
import { TurnosService } from 'src/app/services/turnos.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.scss']
})
export class PedirTurnoComponent implements OnInit {

  @Input() profesionalSeleccionado
  diaSeleccionado
  dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado","domingo"];
  fechaSeleccionada
  duracion_turno:number
  turnosProfesional
  horaSeleccionada
  current
  especialidadSeleccionada

  constructor(private turnosService:TurnosService, private service:AuthService) { }

  ngOnInit(): void {
    this.current = this.service.obtenerUsuario()
  }

  getDate(option : string)
  {
    let fecha = new Date()
    let aux = option=='min'? 1 : 3
    let d :string,m :string,y:string;

    d = fecha.getDate().toString();
    m = (fecha.getMonth()+ aux).toString();
    y = fecha.getFullYear().toString();


    d = d.length == 1 ? '0'+d : d;
    m = m.length == 1 ? '0'+m : m;

    return `${y}-${m}-${d}`
  } 

cambiarHorarios()
  {
    let select: any = document.getElementById("h-p-select");
    this.diaSeleccionado = select.options[select.selectedIndex].text;

    for(let horario of this.profesionalSeleccionado.atencion)
    {
      if(horario.dia == this.diaSeleccionado)
      {
        this.duracion_turno = horario.duracion
        $("#hora").attr("min", `${horario.desde}`);
        $("#hora").attr("max", `${horario.hasta}`);
        $("#fecha").attr("min", `${this.getDate('min')}`)
        $("#fecha").attr("max", `${this.getDate('max')}`)
        break;
      }
    }

  }

	 diaSemana() {
      let date = new Date($("#fecha").val());      
      let diaCalendario = this.dias[date.getDay()];
      if(diaCalendario != this.diaSeleccionado){
        $("#boton").attr('disabled', true)
        $("#error").text("El día seleccionado no coincide con los días de atención del profesional")
        $("#divError").removeAttr('hidden')
      }
      else{
        $("#boton").removeAttr('disabled')
        $("#divError").attr('hidden', true)
      }
    }
    
    validarTurnosDisponibles()
    {
      let flag = false;
  
      this.turnosService.getTurnoProfesional(this.profesionalSeleccionado.email).then((datos:any) =>{
        this.turnosProfesional = datos;
        
          for(let item of this.turnosProfesional.turnos)
          {
            if(this.fechaSeleccionada == item.fecha && this.horaSeleccionada > this.sumarHorasMin(item.horario, this.duracion_turno) && 
              this.horaSeleccionada < this.sumarHorasMax(item.horario, this.duracion_turno) && (item.estado != 'cancelado' || item.estado != 'atendido'))
            {
              console.log(item)
              console.log(item.fecha)
              console.log(this.fechaSeleccionada)
  
              flag = true;
              break;
            }
          }
      
  
        if(!flag){
          this.turnosService.setTurno(this.profesionalSeleccionado.email,this.current.email, this.toJSON(this.duracion_turno))
        }
        else{
          console.error("No hay turnos disponibles en ese horario");
        }
  
      })
    }
  sumarHorasMax(horario, duracion:number)
    {
      let minutosStr:string;
      let horasStr:string;
      let horas:number = Number.parseInt(horario.split(":")[0]);
      let minutos:number = Number.parseInt(horario.split(":")[1]);
      let retorno:string;
  
      minutos += duracion;
  
      if(minutos >= 60){
        horas++
        minutos-= 60
        minutosStr = minutos < 10 ? "0"+minutos.toString() : minutos.toString()
        horasStr = horas < 10 ? "0"+horas.toString() : horas.toString()
  
        retorno = horasStr + ':' + minutosStr
      }
      else{
        minutosStr = minutos < 10 ? "0"+minutos.toString() : minutos.toString()
        horasStr = horas < 10 ? "0"+horas.toString() : horas.toString()
        retorno = horasStr + ":" + minutosStr
      }
      console.log(retorno);
      return retorno
    }
   sumarHorasMin(horario, duracion)
    {
      let minutosStr
      let horasStr
      let horas = Number.parseInt(horario.split(":")[0])
      let minutos = Number.parseInt(horario.split(":")[1])
      minutos -= duracion;
      let retorno:string
  
      if(minutos < 0){
        horas--
        minutos+= 60
        minutosStr = minutos < 10 ? "0"+minutos.toString() : minutos.toString()
        horasStr = horas < 10 ? "0"+horas.toString() : horas.toString()
        retorno = horasStr + ':' + minutosStr
      }
      else{
        minutosStr = minutos < 10 ? "0"+minutos.toString() : minutos.toString()
        horasStr = horas < 10 ? "0"+horas.toString() : horas.toString()
        retorno = horasStr + ":" + minutosStr
      }
  
      console.log(retorno);
      return retorno
    }

    cambiarEspecialidad(){
      let select: any = document.getElementById("selectEsp");
      this.especialidadSeleccionada = select.options[select.selectedIndex].text;
    }
  toJSON(duracion : number)
    {
      return {
        dia: this.diaSeleccionado,
        duracion: duracion,
        estado: 'pendiente',
        fecha: this.fechaSeleccionada,
        horario: this.horaSeleccionada,
        paciente: this.current.email,
        profesional: this.profesionalSeleccionado.email,
        especialidad: this.especialidadSeleccionada
      }
    }
}
