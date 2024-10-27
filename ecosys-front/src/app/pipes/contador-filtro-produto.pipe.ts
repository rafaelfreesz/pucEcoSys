import { Pipe, PipeTransform } from '@angular/core';
import { Produto } from '../models/produto.model';

@Pipe({
  name: 'contadorFiltroProduto'
})
export class ContadorFiltroProdutoPipe implements PipeTransform {

  transform(value: unknown, todosProdutos: any, valor: string, propriedade: string){
    
    if(valor.length === 0 || valor === "" || propriedade === ""){
      return todosProdutos.length;
    }

    let total=0;
    
    for (const produto of todosProdutos){
      if(String(produto[propriedade]).toUpperCase().includes(String(valor).toUpperCase())){
        total++;
      }
    }

    return total;
  }
  
}
//|contadorFiltroProduto:todosProdutos:valorFiltro:criterioFiltro
