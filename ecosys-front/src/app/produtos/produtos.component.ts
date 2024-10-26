import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Subject, Subscription } from 'rxjs';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  private todosProdutos: Produto[] = []
  private produtosAlterados: Subscription

  constructor(private produtoService: ProdutoService) {
    this.produtosAlterados = this.produtoService.produtosAlterados.subscribe(
      todosProdutos => {
        this.todosProdutos = todosProdutos
        console.log(this.todosProdutos)
      }
    )
  }

  ngOnInit(): void {
    
  }

}
