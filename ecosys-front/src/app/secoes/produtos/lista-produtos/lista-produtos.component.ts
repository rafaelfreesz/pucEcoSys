import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { ContadorFiltroPipe } from 'src/app/pipes/contador-filtro.pipe';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit, OnDestroy {

  todosProdutos: Produto[] = []
  private listaProdutosAlterada: Subscription;
  criterioFiltro: string = "nome";
  valorFiltro: string = "";
  totalFiltrado:number = 0;
  itemsListaPorVez = 20;
  totalDeIndices = 0
  indiceLista = 0
  contadorPipe: ContadorFiltroPipe = new ContadorFiltroPipe();

  constructor(private produtoService: ProdutoService) {
    this.listaProdutosAlterada = this.produtoService.listaProdutosAlterada.subscribe(
      todosProdutos => {
        this.todosProdutos = todosProdutos
        this.totalFiltrado = this.contadorPipe.transform(this.totalFiltrado,this.todosProdutos,this.valorFiltro,this.criterioFiltro)
        this.totalDeIndices = Math.ceil(this.todosProdutos.length/this.itemsListaPorVez)
        setTimeout(() =>{this.selecionarProduto(this.todosProdutos[0])},100)
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.listaProdutosAlterada.unsubscribe()
  }

  selecionarProduto(produto: Produto){
    this.produtoService.selecionarProduto(produto)
  }

  prepararCadastro(){
    this.produtoService.selecionarProduto(new Produto())
  }

  defineValoresPaginator(){
    if (this.indiceLista < 2){

      return Array.from({length: Math.min(5,this.totalDeIndices-this.indiceLista+1)}, (_,i) => i+1)
    
    }else if(this.indiceLista > this.totalDeIndices - 4){
      return Array.from({length: Math.min(5,this.totalDeIndices)}, (_,i) => this.totalDeIndices - 4 + i)
    
    }else{
      return Array.from({length: Math.min(5,this.totalDeIndices-this.indiceLista+1)}, (_,i) => this.indiceLista -1 + i)
    }
  }

  selecionaIndicePaginator(indice: number){
    if(indice > 0 && indice < this.totalDeIndices+1){
      this.indiceLista = indice-1
    }
  }

  alteraFiltro(){
    this.indiceLista = 0
    this.totalFiltrado = this.contadorPipe.transform(this.totalFiltrado,this.todosProdutos,this.valorFiltro,this.criterioFiltro)
    this.totalDeIndices = Math.ceil(this.totalFiltrado/this.itemsListaPorVez)
    this.defineValoresPaginator()
  }

  isCarregando(): boolean{
    return this.produtoService.isCarregando;
  }

}
