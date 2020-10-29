import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoNoAtendido'
})
export class EstadoNoAtendidoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let listaEstadoNoAtendido = []
    for (let turno of value) {
      if(turno.estado != 'atendido' && turno.estado != 'cancelado')
        listaEstadoNoAtendido.push(turno)
    }

    return listaEstadoNoAtendido;
  }

}
