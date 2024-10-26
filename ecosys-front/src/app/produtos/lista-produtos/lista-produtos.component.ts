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
  private produtoSelecionado: Produto | null = null;
  private produtosAlterados: Subscription
  criterioFiltro: string = "";
  valorFiltro: string = "";

  constructor(private produtoService: ProdutoService) {
    this.produtosAlterados = this.produtoService.produtosAlterados.subscribe(
      todosProdutos => {
        this.todosProdutos = todosProdutos
        console.log("teste",this.todosProdutos)
      }
    )
  }

  ngOnInit(): void {
  }

  excluirProduto(id: number): void{
    this.produtoService.deleteProduto(id)
  }

}
