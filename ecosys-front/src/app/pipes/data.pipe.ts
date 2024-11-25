import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let data_splited = value.split('-')
    let dia_hora_splited = data_splited[2].split('T')
    let hora_splited = dia_hora_splited[1].split('.')
    hora_splited = hora_splited[0].split(':')
    
    let data_formatada =
      dia_hora_splited[0]
      +'/'+
      data_splited[1]
      + '/'+
      data_splited[0]
      + ' ' +
      (+hora_splited[0]-3)
      + ':' +
      hora_splited[1]
    
    
    return data_formatada;
  }

}
