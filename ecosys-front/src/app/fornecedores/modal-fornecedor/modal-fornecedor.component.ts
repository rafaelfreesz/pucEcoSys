import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

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


  constructor() { }

  ngOnInit(): void {
    console.log("OOOOOOO",this.fornecedor)
    // this.conteudoFormulario = new FormGroup({
    //   'cnpj': new FormControl(),
    //   'razao_social': new FormControl(),
    //   'nome_empresarial': new FormControl(),
    //   'endereco': new FormGroup({
    //     'logradouro': new FormControl(),
    //     'numero': new FormControl(),
    //     'complemento': new FormControl(),
    //     'cep': new FormControl(),
    //     'bairro': new FormControl(),
    //     'cidade': new FormControl(),
    //     'estado': new FormControl(),
    //   }),
    //   'contatos': new FormArray([])

    // })
  }

  comando(comando: string){
    this.onComando.emit(comando);
  }

  iniciarEdicao(){
    this.inEdicao = true
  }

}
