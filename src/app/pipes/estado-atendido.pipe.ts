import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoAtendido'
})
export class EstadoAtendidoPipe implements PipeTransform {

  listaEstadoAtendido = []
  transform(value: any, ...args: unknown[]): unknown {


    for (let turno of value) {
      if(turno.estado != 'pendiente' && turno.estado != 'aceptado')
        this.listaEstadoAtendido.push(turno)
    }
    this.ordenarLista()
    return this.listaEstadoAtendido;
  }

  ordenarLista()
  {
    this.listaEstadoAtendido.sort((a,b) => {
      if(a.fecha> b.fecha)
        return 1
      else
        return -1;
    })
  }

}
