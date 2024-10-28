import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encurtar'
})
export class EncurtarPipe implements PipeTransform {

  transform(value: string, limite: number) {
    if(value != undefined && value.length > limite){
      return value.substring(0,limite) + "...";
    }
    return value;
  }

}
