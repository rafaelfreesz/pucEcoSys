import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit, OnDestroy {

  todosProdutos: Produto[] = []
  produtoSelecionado: Produto | null = null;
  private produtosAlterados: Subscription
  criterioFiltro: string = "nome";
  valorFiltro: string = "";
  totalFiltrado:number = 0;
  isNovoProduto: boolean = false;
  isCarregando: boolean = true;

  constructor(private produtoService: ProdutoService) {
    this.produtosAlterados = this.produtoService.produtosAlterados.subscribe(
      todosProdutos => {
        this.todosProdutos = todosProdutos
        this.isCarregando = false
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.produtosAlterados.unsubscribe()
  }

  prepararCadastro(){
    this.produtoSelecionado = new Produto();
    this.isNovoProduto = true;
  }

  selecionarProduto(produto: Produto){
    this.produtoSelecionado = produto;
  }

  fecharModal(evento: string){
    if(evento === 'excluir'){
      if(this.produtoSelecionado!=null && this.produtoSelecionado.id){
        this.produtoService.deletarProduto(this.produtoSelecionado.id);
      }
    }else if(evento === 'salvar'){
      if(this.produtoSelecionado != null){
        this.produtoService.salvarProduto(this.produtoSelecionado);
      }
    }

    this.isNovoProduto = false;
    this.produtoSelecionado = null;
  }

}
