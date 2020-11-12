import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnosAceptado'
})
export class TurnosAceptadoPipe implements PipeTransform {

  listadoAceptado = []

  transform(value: any, ...args: unknown[]): unknown {
    
    for (let turno of value) {
      if(turno.estado == 'aceptado' || turno.estado == 'atendido')
        this.listadoAceptado.push(turno)
    }
    this.ordenarLista()
    return this.listadoAceptado;
  }

  ordenarLista()
  {
    this.listadoAceptado.sort((a,b) => {
      if(a.fecha> b.fecha)
        return 1
      else
        return -1;
    })
  }
}
