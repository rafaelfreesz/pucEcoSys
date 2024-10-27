import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  todosProdutos: Produto[] = []
  produtoSelecionado: Produto | null = null;
  private produtosAlterados: Subscription
  criterioFiltro: string = "nome";
  valorFiltro: string = "";
  totalFiltrado:number = 0;

  constructor(private produtoService: ProdutoService) {
    this.produtosAlterados = this.produtoService.produtosAlterados.subscribe(
      todosProdutos => {
        this.todosProdutos = todosProdutos
        this.produtoSelecionado = this.todosProdutos[0]
      }
    )
  }

  ngOnInit(): void {
  }

  excluirProduto(id: number): void{
    this.produtoService.deleteProduto(id)
  }

  selecionarProduto(produto: Produto){
    this.produtoSelecionado = produto;
    console.log(this.produtoSelecionado)
  }

  fecharModal(evento: string){
    console.log(evento)
    if(evento === 'excluir'){
      if(this.produtoSelecionado!=null){
        this.produtoService.deleteProduto(this.produtoSelecionado.id);
      }
    }else if(evento === 'salvar'){

    }

    this.produtoSelecionado = null;
  }

}
