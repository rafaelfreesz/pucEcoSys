import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-fornecedor',
  templateUrl: './modal-fornecedor.component.html',
  styleUrls: ['./modal-fornecedor.component.scss']
})
export class ModalFornecedorComponent implements OnInit {

  @Input() fornecedor: any;
  @Output() onComando: EventEmitter<string> = new EventEmitter<string>();
  conteudoFormulario: FormGroup | any;
  @Input() inEdicao: boolean = false;
  private temContatoSemDados: boolean = false;


  constructor() { }

  ngOnInit(): void {
    console.log("OOOOOOO",this.fornecedor)
    this.inEdicao = true
    this.conteudoFormulario = new FormGroup({
      'cnpj': new FormControl(this.fornecedor.cnpj),
      'razao_social': new FormControl(this.fornecedor.razao_social),
      'nome_empresarial': new FormControl(this.fornecedor.nome_empresarial),
      'endereco': new FormGroup({
        'logradouro': new FormControl(this.fornecedor.endereco.logradouro),
        'numero': new FormControl(this.fornecedor.endereco.numero),
        'complemento': new FormControl(this.fornecedor.endereco.complemento),
        'cep': new FormControl(this.fornecedor.endereco.cep),
        'bairro': new FormControl(this.fornecedor.endereco.bairro),
        'cidade': new FormControl(this.fornecedor.endereco.cidade),
        'estado': new FormControl(this.fornecedor.endereco.estado),
      }),
      'contatos': new FormArray(this.buildContatosArray())

    })

    
  }

  comando(comando: string){
    this.onComando.emit(comando);
  }

  iniciarEdicao(){
    this.inEdicao = true
  }

  submeterFormulario(){
    console.log(this.conteudoFormulario.value)
  }

  getContatos(){
    console.log(this.conteudoFormulario.get('contatos'))
    return this.conteudoFormulario.get('contatos').controls
  }

  private buildContatosArray(){
    let contatosArray: FormGroup[] = []

    this.fornecedor.contatos.forEach( (contato: {'tipo': String, 'valor': String}) => {
      contatosArray.push(new FormGroup({
        'tipo': new FormControl(contato.tipo),
        'valor': new FormControl(contato.valor),
        
      }))
    })

    return contatosArray;

  }

  criarContato(): void{
    if(!this.temContatoSemDados){
      const control = new FormControl(null);
      (<FormArray>this.conteudoFormulario.get('contatos').push(control));
      this.temContatoSemDados = true;
    }
  }

}
