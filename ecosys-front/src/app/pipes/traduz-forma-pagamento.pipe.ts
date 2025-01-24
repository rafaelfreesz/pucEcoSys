import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traduzFormaPagamento'
})
export class TraduzFormaPagamentoPipe implements PipeTransform {

  transform(value: string): unknown {
    if(value ==="d"){
      return "Dinheiro";
    }else if(value ==="p"){
      return "Pix";
    }else if(value ==="cd"){
      return "Débito";
    }else if(value ==="cc"){
      return "Crédito";
    }else {
      return "Não identificado";
    }
  }

}
