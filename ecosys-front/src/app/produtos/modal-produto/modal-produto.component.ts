import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.scss']
})
export class ModalProdutoComponent implements OnInit {

  @Input() produto: any;
  @Output() onComando: EventEmitter<string> = new EventEmitter<string>();
  conteudoFormulario: FormGroup;
  @Input() inEdicao: boolean = false;
  url_teste: string = 'http://............'

  constructor() {
    this.conteudoFormulario = new FormGroup({
      'nome': new FormControl(null,Validators.required),
      'descricao': new FormControl(null),
      'preco_venda': new FormControl(null,[Validators.required,Validators.min(0.01)]),
      'qtd_estoque': new FormControl(null),
      'url_imagem': new FormControl(null)

    })
  }

  ngOnInit(): void {
    
  }

  comando(comando: string){
    this.onComando.emit(comando);
  }

  iniciarEdicao(){
    this.inEdicao = true
  }

}
