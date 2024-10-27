import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';

@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.css']
})
export class ModalProdutoComponent implements OnInit {

  @Input() produto: any;
  @Output() onFechar: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  fechar(){
    this.onFechar.emit();
  }

}
