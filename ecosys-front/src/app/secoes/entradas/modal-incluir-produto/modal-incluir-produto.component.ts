import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-modal-incluir-produto',
  templateUrl: './modal-incluir-produto.component.html',
  styleUrls: ['./modal-incluir-produto.component.css'],
  providers: [ProdutoService]
})
export class ModalIncluirProdutoComponent implements OnInit, OnDestroy {

  @Output() fecharModal: EventEmitter<any> = new EventEmitter<any>();
  todosProdutos: any[] = []
  produtoSelecionado: any;
  produtosAlterados: Subscription;
  valorFiltro: string = "";
  criterioFiltro: string = "nome";
  precoCompra: number = 0.01;
  quantidade: number = 1;
  constructor(private produtoService: ProdutoService) {
    this.produtosAlterados = this.produtoService.produtosAlterados.subscribe(
        todosProdutos => {
          this.todosProdutos = todosProdutos;
        }
    )
  }

    ngOnInit(): void {
  }

  
  ngOnDestroy(): void {
    this.produtosAlterados.unsubscribe()
  }

  cancelar(){
    this.fecharModal.emit(null);
  }

  selecionar(produto: any){
    if(this.produtoSelecionado && produto.id === this.produtoSelecionado.id){
      this.produtoSelecionado = null
    }else{

      this.produtoSelecionado = produto;
    }
    //this.fecharModal.emit(produto);
  }

}
