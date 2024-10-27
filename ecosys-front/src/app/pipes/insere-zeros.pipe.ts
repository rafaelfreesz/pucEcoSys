import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'insereZeros'
})
export class InsereZerosPipe implements PipeTransform {

  transform(value: number, tamanho: number) {
    
    let valueString = String(value);
    if(valueString.length < tamanho){
      for(let i=valueString.length; i<tamanho; i++){
        valueString = "0" + valueString;
      }
      return valueString;
    }
    return valueString;
  }

}
