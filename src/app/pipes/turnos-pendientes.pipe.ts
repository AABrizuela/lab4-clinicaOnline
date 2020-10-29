import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnosPendientes'
})
export class TurnosPendientesPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let listaEstadoNoAtendido = []
    for (let turno of value) {
      if(turno.estado == 'pendiente')
        listaEstadoNoAtendido.push(turno)
    }

    return listaEstadoNoAtendido;

  }

}
