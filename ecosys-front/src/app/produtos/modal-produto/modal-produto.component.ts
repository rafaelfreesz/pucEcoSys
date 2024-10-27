import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.css']
})
export class ModalProdutoComponent implements OnInit {

  @Input() produto: any;
  @Output() onFechar: EventEmitter<any> = new EventEmitter<any>();
  formularioSubmetido: FormGroup;
  inEdicao: boolean = true;

  constructor() {
    this.formularioSubmetido = new FormGroup({
      'nome': new FormControl(null),
      'descricao': new FormControl(null),
      'preco_venda': new FormControl(null),
      'qtd_estoque': new FormControl(null),

    })
  }

  ngOnInit(): void {
    
  }

  fechar(){
    this.onFechar.emit();
  }

  editar(){
    this.inEdicao = true
  }

}
