import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contadorFiltro',
  pure: false
})
export class ContadorFiltroPipe implements PipeTransform {

  transform(value: unknown, todosElementos: any, valor: string, propriedade: string){
    
    if(valor.length === 0 || valor === "" || propriedade === ""){
      return todosElementos.length;
    }

    let total=0;
    
    for (const elemento of todosElementos){
      if(String(elemento[propriedade]).toUpperCase().includes(String(valor).toUpperCase())){
        total++;
      }
    }

    return total;
  }
  
}
