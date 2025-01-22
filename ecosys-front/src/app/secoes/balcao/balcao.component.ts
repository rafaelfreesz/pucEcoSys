import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-balcao',
  templateUrl: './balcao.component.html',
  styleUrls: ['./balcao.component.css'],
  providers: [ProdutoService]
})
export class BalcaoComponent implements OnInit, OnDestroy {

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
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.produtosAlterados.unsubscribe()
  }

  selecionarProduto(produto: any):void{

  }

}
