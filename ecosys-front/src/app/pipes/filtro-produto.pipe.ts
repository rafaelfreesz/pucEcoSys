import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProduto'
})
export class FiltroProdutoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
