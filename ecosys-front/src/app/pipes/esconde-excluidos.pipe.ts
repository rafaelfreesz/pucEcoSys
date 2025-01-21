import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'escondeExcluidos'
})
export class EscondeExcluidosPipe implements PipeTransform {

  transform(values: any[], itemsPraExclusao: any[]): any[] {

    var lista_filtrada =values.filter((elemento) =>  {
      
      return !itemsPraExclusao.includes(elemento)

    } );

    return lista_filtrada;
  }

}
