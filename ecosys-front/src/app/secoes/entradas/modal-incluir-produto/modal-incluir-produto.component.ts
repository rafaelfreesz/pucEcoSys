import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemEntrada } from 'src/app/models/item_entrada.model';
import { ItemVenda } from 'src/app/models/item_venda.model';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-modal-incluir-produto',
  templateUrl: './modal-incluir-produto.component.html',
  styleUrls: ['./modal-incluir-produto.component.css']
})
export class ModalIncluirProdutoComponent implements OnInit, OnDestroy {

  @Output() fecharModal: EventEmitter<any> = new EventEmitter<any>();
  @Input() finalidade: string = "compra"
  todosProdutos: any[] = []
  produtoSelecionado: any;
  listaProdutosAlterada: Subscription;
  valorFiltro: string = "";
  criterioFiltro: string = "nome";
  precoCompra: number = 0.01;
  quantidade: number = 1;

  constructor(private produtoService: ProdutoService) {
  }
  
  ngOnInit(): void {
    this.todosProdutos = this.produtoService.getTodosProdutos();
    this.listaProdutosAlterada = this.produtoService.listaProdutosAlterada.subscribe(
          todosProdutos => {
            this.todosProdutos = todosProdutos;
          }
      )
  }

  
  ngOnDestroy(): void {
    this.listaProdutosAlterada.unsubscribe()
  }

  cancelar(){
    this.produtoSelecionado = null;
    this.fecharModal.emit(null);
  }

  selecionar(produto: any){
    if(this.produtoSelecionado && produto.id === this.produtoSelecionado.id){
      this.produtoSelecionado = null
    }else{

      this.produtoSelecionado = produto;
    }    
  }

  adicionar(){
    let novoItem: ItemEntrada | ItemVenda | null = null;
    if(this.finalidade === "compra"){
      novoItem = new ItemEntrada();
      novoItem.preco_compra = this.precoCompra;
      novoItem.quantidade = this.quantidade;
      novoItem.produto = this.produtoSelecionado;
    }else{
      novoItem = new ItemVenda();
      novoItem.quantidade = this.quantidade;
      novoItem.produto = this.produtoSelecionado;
      novoItem.preco_unitario = this.produtoSelecionado.preco_venda;

    }
    this.fecharModal.emit(novoItem);
  
  }

  isLoading(){
    return this.produtoService.isLoading;
  }

}
