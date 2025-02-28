import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginator'
})
export class PaginatorPipe implements PipeTransform {

  transform(value: any[], itemsListaPorVez: number,indiceLista: number): any[] {
    let indiceInicial = indiceLista*itemsListaPorVez;
    let indiceFinal = indiceInicial + itemsListaPorVez
    return value.slice(indiceInicial,indiceFinal);
  }

}
