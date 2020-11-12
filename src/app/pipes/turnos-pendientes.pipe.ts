import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnosPendientes'
})
export class TurnosPendientesPipe implements PipeTransform {

  listaEstadoNoAtendido = []

  transform(value: any, ...args: unknown[]): unknown {
    
    for (let turno of value) {
      if(turno.estado == 'pendiente')
        this.listaEstadoNoAtendido.push(turno)
    }

    this.ordenarLista()
    return this.listaEstadoNoAtendido;

  }

  ordenarLista()
  {
    this.listaEstadoNoAtendido.sort((a,b) => {
      if(a.fecha> b.fecha)
        return 1
      else
        return -1;
    })
  }

}
