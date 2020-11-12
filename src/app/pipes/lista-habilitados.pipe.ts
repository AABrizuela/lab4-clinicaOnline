import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listaHabilitados'
})
export class ListaHabilitadosPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    let listaHabilitados = []
    for (let prof of value) {
      if(prof.habilitado)
        listaHabilitados.push(prof)
    }

    listaHabilitados.sort((a, b) => a.apellido.localeCompare(b.apellido))

    return listaHabilitados
  }

}
