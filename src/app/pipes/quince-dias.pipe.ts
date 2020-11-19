import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from "luxon";

@Pipe({
  name: 'quinceDias'
})
export class QuinceDiasPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let aux = [];
    let now = this.getDateNow();

    for(let item of value)
    {
      if(item.fecha >= now)
      {
        aux.push(item);
      }
    }

    return aux;
  }

  getDateNow()
  {
    var dt = DateTime.local();
    var dtEs = dt.setLocale('es');
    var ret = dtEs.toLocaleString(DateTime.DATE_SHORT);

    return ret;
  }

}
