import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verResena'
})
export class VerResenaPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    let array = []
    for (let datitos of Object.keys(value)) {
      array.push( {nombre: datitos ,valor: value[datitos]})
    }

    return array;
  }

}
