import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnosAceptado'
})
export class TurnosAceptadoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let listadoAceptado = []
    for (let turno of value) {
      if(turno.estado == 'aceptado')
        listadoAceptado.push(turno)
    }

    return listadoAceptado;
  }

}
