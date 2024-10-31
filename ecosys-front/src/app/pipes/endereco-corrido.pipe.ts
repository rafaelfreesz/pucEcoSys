import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enderecoCorrido'
})
export class EnderecoCorridoPipe implements PipeTransform {

  transform(value: any): string {
    
    let endereco: string = "";

    if(value.logradouro){
      endereco+=value.logradouro+', '
    }
    
    if(value.numero){
      endereco+=+value.numero+', ' ;
      if(value.complemento){
        endereco+=value.complemento+', '
      }
    }
    
    if(value.bairro){
      endereco+=value.bairro+', '
    }

    if(value.cidade){
      endereco+=value.cidade
      if(value.estado){
        endereco+=' - '+value.estado+', ';
      }else{
        endereco+=', '
      }
    }

    if (value.cep){
      endereco+="CEP "+ String(value.cep).substring(0,5)+'-'+String(value.cep).substring(5,8)
    }
    
    return endereco;
  }

}
