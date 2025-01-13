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
  conteudoFormulario: FormGroup | any;
  @Input() inEdicao: boolean = false;
  url_teste: string = 'http://............'

  constructor() {
  }

  ngOnInit(): void {
    this.conteudoFormulario = new FormGroup({
      'nome': new FormControl(this.produto.nome,Validators.required),
      'descricao': new FormControl(this.produto.descricao),
      'preco_venda': new FormControl(this.produto.preco_venda,[Validators.required,Validators.min(0.01)]),
      'qtd_estoque': new FormControl(this.produto.qtd_estoque),
      'url_imagem': new FormControl(this.url_teste)

    })
  }

  comando(comando: string){
    this.onComando.emit(comando);
  }

  iniciarEdicao(){
    this.inEdicao = true
  }

  submeterFormulario(){
    this.produto.nome = this.conteudoFormulario.value.nome;
    this.produto.descricao = this.conteudoFormulario.value.descricao;
    this.produto.preco_venda = this.conteudoFormulario.value.preco_venda;
    this.produto.qtd_estoque = this.conteudoFormulario.value.qtd_estoque;
    this.comando('salvar')
  }

}
