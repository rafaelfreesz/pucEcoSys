import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneCorrido'
})
export class TelefoneCorridoPipe implements PipeTransform {

  transform(value: any): string {
    let contato:string="("+String(value.valor).substring(0,2)+") ";
    
    contato+= String(value.valor).substring(2,6)+"-"+String(value.valor).substring(6,10)

    return contato;
  }

}
