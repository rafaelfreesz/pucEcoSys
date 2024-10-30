import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroLista'
})
export class FiltroListaPipe implements PipeTransform {

  transform(value: any, valor: string, propriedade: string) {
    
    if(valor.length === 0 || valor === "" || propriedade === ""){
      return value;
    }
    const valorFiltrado: any[] = []

    for (const elemento of value){
      if(String(elemento[propriedade]).toUpperCase().includes(String(valor).toUpperCase())){
        valorFiltrado.push(elemento)
      }
    }

    return valorFiltrado;
  }

}
