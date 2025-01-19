import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'escondeExcluidos'
})
export class EscondeExcluidosPipe implements PipeTransform {

  transform(values: any[], idsPraExclusao: string[]): any[] {

    var lista_filtrada =values.filter((elemento) =>  {
      
      return !idsPraExclusao.includes(elemento.id)

    } );

    return lista_filtrada;
  }

}
