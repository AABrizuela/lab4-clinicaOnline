import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoAtendido'
})
export class EstadoAtendidoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    let listaEstadoAtendido = []
    for (let turno of value) {
      if(turno.estado != 'pendiente' && turno.estado != 'aceptado')
        listaEstadoAtendido.push(turno)
    }

    return listaEstadoAtendido;
  }

}
