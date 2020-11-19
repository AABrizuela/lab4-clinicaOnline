import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts'
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { DownloadFilesService } from 'src/app/services/download-files.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

  user
  series = [];
  especialidades:any;
  semana:any;
  turnos:any;
  dias:any = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  apretado = 'opxesp'
  constructor(private service : AuthService,private turnosService : TurnosService, private router:Router, private filesService:DownloadFilesService) { }

  ngOnInit(): void {
    this.user = this.service.obtenerUsuario()

    this.service.getBDByDoc('especialidad', 'especialidades').then((datos : any) => {
      this.especialidades = datos.nombre;
      this.turnosService.getTurnosProfesionalTodos().then((datos:any) => {
        this.turnos = datos
        this.cargarOperacionesEspecialidades()

      })
  
    })

    this.service.getBD('semana').then((datos) => {
      this.semana = datos;
    })


  }

  logout(){
    this.service.logout()
    this.router.navigate(['login'])
  }

  options:any = {
    chart: {
      type: 'bar',
      /* height: '90%',
      width: '100%', */
      backgroundColor: 'white',
      plotBackgroundColor: 'rgb(255, 255, 210)',
      plotShadow: true,
      plotBorderWidth: 1
    },
    title: {
      text: 'Sample Scatter Plot'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
        return Highcharts.format('cantidad', this.x)+ ": " + this.y;
      }
    },
    xAxis: {
      type: 'string',
      labels: {
        formatter: function() {
          
        }
      }
    },
    yAxis:{
      title:{
        text:""
      }
    },
    series: []//this.series 
  }

cargarOperacionesEspecialidades()
  {
    this.cambiarBoton('opxesp')
    this.series = []
    let c_especialidad:number = 0;
    
    for(let especialidad of this.especialidades)
    {
      for(let item of this.turnos)
      {
          for(let turno of item.turnos)
          {
            if(turno.especialidad == especialidad)
            {
              c_especialidad++;
            }
          }
      }
      
      this.series.push({name: especialidad, data: [c_especialidad]});
      console.log(this.series); 
      this.options.series = this.series

      c_especialidad = 0;
    }

    this.cargarCharEspecialidades();
  }

  cargarCharEspecialidades()
  {
    this.options.yAxis.title.text = "Cantidad de operaciones";
    this.options.title.text = "Operacion por especialidad";
    Highcharts.chart('graficos', this.options);
  }

  cargarCantidadTurnosPorSemana(){
    this.cambiarBoton('turnxdia')

    this.series = []
    let c_turnos:number = 0;

    for(let dias of this.dias)
    {
      for(let item of this.turnos)
      {
          for(let turno of item.turnos)
          {
            if(turno.dia == dias.toLocaleLowerCase())
            {
              c_turnos++;
            }
          }
      }
      
      this.series.push({name: dias, data: [c_turnos]});
      console.log(this.series); 
      this.options.series = this.series
      c_turnos = 0;
    }

    this.cargarCharCantidadTurnosPorSemana();
  }

cargarCharCantidadTurnosPorSemana(){
    this.options.tooltip = {
      formatter: function() {
        return Highcharts.format('cantidad turnos', this.x)+ ": " + this.y;
      }
    }
    this.options.chart.type = "column"
    this.options.yAxis.title.text = "Cantidad de turnos";
    this.options.title.text = "Cantidad de turnos por dia";
    Highcharts.chart('graficos', this.options);
  }

  cargarTurnosPorProfesional()
  {
    this.cambiarBoton('turnxmed')

    this.series = []
    for(let item of this.turnos)
    {
      this.series.push({name: item.nombre , data: [item.turnos.length]});
      console.log(this.series); 
    }

    this.options.series = this.series

    this.cargarChartTurnosPorProfesional();
  }

  cargarChartTurnosPorProfesional()
  {
    this.options.tooltip = {
      formatter: function() {
        return Highcharts.format('cantidad turnos', this.x)+ ": " + this.y;
      }
    }
    this.options.chart.type = "bar"
    this.options.yAxis.title.text = "Cantidad de turnos";
    this.options.title.text = "Cantidad de turnos por profesional";
    Highcharts.chart('graficos', this.options);
  }

  cargarProfesionalesPorDia()
  {
    this.cambiarBoton('medxdia')

    this.series = []
    let c_profesionales:number = 0;

    for(let dias of this.semana)
    {  
      this.series.push({name: dias.dia, data: [dias.profesionales.length]});
      console.log(this.series); 
      c_profesionales = 0;
    }
    this.options.series = this.series

    this.cargarChartProfesionalesPorDia();
  }

  cargarChartProfesionalesPorDia()
  {
    this.options.tooltip = {
      formatter: function() {
        return Highcharts.format('cantidad profesionales', this.x)+ ": " + this.y;
      }
    }
    this.options.chart.type = "column"
    this.options.yAxis.title.text = "Cantidad de medicos";
    this.options.title.text = "Cantidad de medicos por dia";
    Highcharts.chart('graficos', this.options);
  }

  cambiarBoton(id:string){
    switch(id){
      case 'opxesp':
        $("#opxesp").addClass('apretado')
        this.apretado = 'opxesp'
        $("#turnxdia").removeClass('apretado')
        $("#turnxmed").removeClass('apretado')
        $("#medxdia").removeClass('apretado')
        break;
      case 'turnxdia':
        $("#opxesp").removeClass('apretado')
        this.apretado = 'turnxdia'
        $("#turnxdia").addClass('apretado')
        $("#turnxmed").removeClass('apretado')
        $("#medxdia").removeClass('apretado')
        break;
      case 'turnxmed':
        $("#opxesp").removeClass('apretado')
        this.apretado = 'turnxmed'
        $("#turnxdia").removeClass('apretado')
        $("#turnxmed").addClass('apretado')
        $("#medxdia").removeClass('apretado')
        break;
      case 'medxdia':
        $("#opxesp").removeClass('apretado')
        this.apretado = 'medxdia'
        $("#turnxdia").removeClass('apretado')
        $("#turnxmed").removeClass('apretado')
        $("#medxdia").addClass('apretado')
        break;
    }
  }

  preparaParaDescargar(lista, name, nameData){
    return lista.map(dato=>{
       return {[name]:dato.name,[nameData]:dato.data[0]}
     })
   }

   descargarExcel(){
    switch(this.apretado){
      case 'opxesp':
        this.filesService.exportAsExcelFile(this.preparaParaDescargar(this.series, 'Especialidad','Cant Operaciones'), 'Operaciones por especialidades')
        break;
      case 'turnxdia':
        this.filesService.exportAsExcelFile(this.preparaParaDescargar(this.series, 'Día','Cant Turnos'), 'Turnos por día')
        break;
      case 'turnxmed':
        this.filesService.exportAsExcelFile(this.preparaParaDescargar(this.series, 'Profesional','Cant Turnos'), 'Turnos por profesional')
        break;
      case 'medxdia':
          this.filesService.exportAsExcelFile(this.preparaParaDescargar(this.series, 'Día','Cant Profesionales'), 'Profesional por día')
          break;
    }
   }

   descargarPDF(){
    let aux = [];
    let tittle
    if(this.apretado != undefined){
      switch(this.apretado){
        case 'opxesp':
          tittle =  'Operaciones por especialidades'
          break;
        case 'turnxdia':
          tittle = 'Turnos por día'
          break;
        case 'turnxmed':
          tittle = 'Turnos por profesional'
          break;
        case 'medxdia':
            tittle = 'Profesional por día'
            break;
      }

      var docDefinition = {
        content: [
          tittle,
          {  }
        ]
      };

      for(let serie of this.series)
      {
        aux.push({text: `${serie.name}: ${serie.data[0]}`})
      }

      docDefinition.content[1] = {ul : aux};

      console.log(docDefinition.content[1]);

      pdfMake.createPdf(docDefinition).open();
    }
  }
}
