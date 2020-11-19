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
  @Output() especialidadSeleccionadaOpt : EventEmitter<any> = new EventEmitter<any>();

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

  constructor(private turnosService:TurnosService, private service:AuthService)
  {

  }

  ngOnInit(): void {
    this.current = this.service.obtenerUsuario()
    this.service.getBDByDoc('pacientes', this.current.email).then(data=>this.dataCurrent=data)
    this.quinceDias = [];
    this.horarios = [];
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
    // this.traerFecha(diaSelec);
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

    async validarTurnosDisponibles(hora)
    {

      let flag = false;

      let datos = await this.turnosService.getTurnoProfesional(this.profesionalSeleccionado.email);

      this.turnosProfesional = datos;

      for(let item of this.turnosProfesional.turnos)
      {
        if(item.fecha == this.fechaSeleccionada)
        {
          if(item.horario == hora)
          {
            if(item.estado == 'cancelado')
            {
              flag = true;
            }
            else if(item.estado == 'aceptado' || item.estado == 'pendiente' || item.estado == 'atendido')
            {
              flag = false;
              break;
            }
            else
            {
              flag = true;
            }
          }
          else
          {
            flag = true;
          }
         }
        else
        {
          flag = true;
        }
      }

      return flag;
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
    }

  traerFecha(param)
  {
    this.quinceDias = []
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

  async traerHora()
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
    hora = DateTime.fromFormat(horariosAux[0].desde, 'T').toLocaleString(DateTime.TIME_24_SIMPLE);
    //this.horarios.push(hora);
    console.log("retorno valid: " + this.validarTurnosDisponibles(hora))
    if(await this.validarTurnosDisponibles(hora))
    {
      this.horarios.push(hora);
    }
    while(i < 16)
    {
      if(hora !== DateTime.fromFormat(horariosAux[0].hasta, 'T').toLocaleString(DateTime.TIME_24_SIMPLE))
      {
        hora = DateTime.fromFormat(hora, 'T').plus({minutes: horariosAux[0].duracion}).toLocaleString(DateTime.TIME_24_SIMPLE);
        console.log("retorno valid: " + this.validarTurnosDisponibles(hora))
        if(await this.validarTurnosDisponibles(hora))
        {
          this.horarios.push(hora);
        }
      }
      else
      {
        break;
      }
      i++;
    }
  }

  handleEspecialidad(especialidad)
  {
    //tiene que llegar la especialidad seleccionada del array de especialidades
    this.especialidadSeleccionada = especialidad;
  }

  handleDia(dia)
  {
    //tiene que llegar el dia seleccionado del array de dias
    this.diaSeleccionado = dia;
    this.traerFecha(this.diaSeleccionado);
  }

  handleFecha(fecha)
  {
    //tiene que llegar la fecha seleccionada del array de fechas

    this.fechaSeleccionada = fecha;
    this.traerHora();
  }

  handleHora(hora)
  {
    //tiene que llegar la hora seleccionada del array de horas
    console.log("Llega por output: " + hora);
    this.horaSeleccionada = hora;
    this.turnosService.setTurno(this.profesionalSeleccionado.email,this.current.email, this.toJSON(this.profesionalSeleccionado.atencion[0].duracion));
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
