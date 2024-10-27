import { Pipe, PipeTransform } from '@angular/core';
import { Produto } from '../models/produto.model';

@Pipe({
  name: 'filtroProduto'
})
export class FiltroProdutoPipe implements PipeTransform {

  transform(value: any, valor: string, propriedade: string) {
    
    if(valor.length === 0 || valor === "" || propriedade === ""){
      return value;
    }
    const valorFiltrado: Produto[] = []

    for (const produto of value){
      if(String(produto[propriedade]).toUpperCase().includes(String(valor).toUpperCase())){
        valorFiltrado.push(produto)
      }
    }

    return valorFiltrado;
  }

}
