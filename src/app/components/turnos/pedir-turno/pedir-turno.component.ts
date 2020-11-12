import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery'
import { TurnosService } from 'src/app/services/turnos.service';
import { AuthService } from 'src/app/services/auth.service';
import { DateTime } from 'luxon';
import Info from 'luxon/src/info.js'

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.scss']
})
export class PedirTurnoComponent implements OnInit {

  @Input() profesionalSeleccionado
  @Output() output_pedir:EventEmitter<any> = new EventEmitter<any>()
  diaSeleccionado
  dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sábado", "domingo"];
  fechaSeleccionada
  duracion_turno:number
  turnosProfesional
  horaSeleccionada
  current
  especialidadSeleccionada
  error = false
  dataCurrent
  errorIgual= false
  quinceDias = []
  horarios = []

  constructor(private turnosService:TurnosService, private service:AuthService) { }

  ngOnInit(): void {
    this.current = this.service.obtenerUsuario()
    this.service.getBDByDoc('pacientes', this.current.email).then(data=>this.dataCurrent=data)
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

cambiarHorarios(diaSelec)
  {
    this.diaSeleccionado = diaSelec;
    this.quinceDias = [];

    //console.log(this.profesionalSeleccionado.atencion);

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
    this.traerFecha(diaSelec);
  }

	 diaSemana() {
      let date = new Date($("#fecha").val());
      let diaCalendario = this.dias[date.getDay()];
      if(diaCalendario != this.diaSeleccionado){
        $("#boton").attr('disabled', true)
        $("#error").text('El día seleccionado no coincide con los días de atención del profesional')
        this.error = true
      }
      else{
        $("#boton").removeAttr('disabled')
        this.error = false
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
            console.log("Item vvv")
            console.log(item)
              console.log("Item fecha: " + item.fecha)
              console.log("Fecha seleccionada: " + this.fechaSeleccionada)
          }


        // if(!flag){
        //   this.turnosService.setTurno(this.profesionalSeleccionado.email,this.current.email, this.toJSON(this.duracion_turno))
        //   this.output_pedir.emit()
        // }
        // else{
        //   console.error("No hay turnos disponibles en ese horario");
        //   this.errorIgual = true
        //   setTimeout(() => {
        //     this.errorIgual = false
        //   }, 3000);
        // }

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

    cambiarEspecialidad(esp){
      this.especialidadSeleccionada = esp;
      this.quinceDias = [];
      this.horarios = [];
    }

  traerFecha(param)
  {
    // console.log(param);
    var dt = DateTime.local();
    var dtEs = dt.setLocale('es');
    var proxSemana;
    var dosSemanas;
    var i = 0;
    var diaAux;

    if(param !== dtEs.weekdayLong.replace(/[á]/g, "a").replace(/[é]/g, "e"))
    {
      for(i; i < 7; i++)
      {
        diaAux = dtEs.plus({ days: i }).setLocale('es');
        if(param !== diaAux.weekdayLong.replace(/[á]/g, "a").replace(/[é]/g, "e"))
        {
          continue;
        }
        else
        {
          break;
        }
      }
      proxSemana = diaAux.setLocale('es').toLocaleString(DateTime.DATE_SHORT);
      this.quinceDias.push(proxSemana);
      dosSemanas = diaAux.plus({days: 7}).setLocale('es').toLocaleString(DateTime.DATE_SHORT);
      this.quinceDias.push(dosSemanas);
      console.log(this.quinceDias);
    }
    else
    {
      proxSemana = dtEs.plus({days: 7}).setLocale('es').toLocaleString(DateTime.DATE_SHORT);
      this.quinceDias.push(proxSemana);
      dosSemanas = dtEs.plus({days: 14}).setLocale('es').toLocaleString(DateTime.DATE_SHORT);
      this.quinceDias.push(dosSemanas);
    }

  }

  traerHora(param)
  {
    this.horarios = [];
    var horariosAux = this.profesionalSeleccionado.atencion;
    var hora:string;
    var i = 0;
    // console.log(DateTime.fromFormat(horariosAux[0].desde, 'T').plus({minutes: horariosAux[0].duracion}).toLocaleString(DateTime.TIME_24_SIMPLE));
    // hora = DateTime.fromFormat(horariosAux[0].desde, 'T').plus({minutes: horariosAux[0].duracion}).toLocaleString(DateTime.TIME_24_SIMPLE);
    // this.horarios.push(hora);
    // this.horarios.push(DateTime.fromFormat(horariosAux[0].desde, 'T').toLocaleString(DateTime.TIME_24_SIMPLE));
    // console.log(DateTime.fromFormat(horariosAux[0].desde, 'T').toLocaleString(DateTime.TIME_24_SIMPLE));
    // if(hora == DateTime.fromFormat(horariosAux[0].desde, 'T').toLocaleString(DateTime.TIME_24_SIMPLE))
    // {
    //   console.log('entro al if que se yo');
    // }
    console.log(this.profesionalSeleccionado);
    console.log(horariosAux);
    hora = DateTime.fromFormat(horariosAux[0].desde, 'T').toLocaleString(DateTime.TIME_24_SIMPLE);
    this.horarios.push(hora);
    while(i < 16)
    {
      if(hora !== DateTime.fromFormat(horariosAux[0].hasta, 'T').toLocaleString(DateTime.TIME_24_SIMPLE))
      {
        hora = DateTime.fromFormat(hora, 'T').plus({minutes: horariosAux[0].duracion}).toLocaleString(DateTime.TIME_24_SIMPLE);
        this.horarios.push(hora);
      }
      else
      {
        break;
      }
      i++;
    }
    this.validarTurnosDisponibles();
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
        especialidad: this.especialidadSeleccionada,
        nombreProfesional: this.profesionalSeleccionado.nombre + ' ' + this.profesionalSeleccionado.apellido,
        nombrePaciente: this.dataCurrent.nombre + " " + this.dataCurrent.apellido
      }
    }
}
