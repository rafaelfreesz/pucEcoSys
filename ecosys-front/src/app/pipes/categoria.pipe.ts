import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoria'
})
export class CategoriaPipe implements PipeTransform {

  transform(value: string): string {
    switch (value){
      case 'g':
        return 'Gerência';
        break;
      case 'v':
        return 'Vendas'
        break;
      default:
        return "Desconhecido"
    }
  }

}
