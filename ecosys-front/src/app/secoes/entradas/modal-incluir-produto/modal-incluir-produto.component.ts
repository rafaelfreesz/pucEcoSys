import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemEntrada } from 'src/app/models/item_entrada.model';
import { ItemVenda } from 'src/app/models/item_venda.model';
import { Produto } from 'src/app/models/produto.model';
import { ContadorFiltroPipe } from 'src/app/pipes/contador-filtro.pipe';
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
  mostrarErro: boolean = false;

  //Paginator
  itemsListaPorVez = 10;
  totalFiltrado:number = 0;
  totalDeIndices = 0
  indiceLista = 0
  contadorPipe: ContadorFiltroPipe = new ContadorFiltroPipe();

  constructor(private produtoService: ProdutoService) {}
  
  ngOnInit(): void {
    this.todosProdutos = this.produtoService.getTodosProdutos();
    this.totalFiltrado = this.contadorPipe.transform(this.totalFiltrado,this.todosProdutos,this.valorFiltro,this.criterioFiltro)
    this.totalDeIndices = Math.ceil(this.todosProdutos.length/this.itemsListaPorVez)
    this.listaProdutosAlterada = this.produtoService.listaProdutosAlterada.subscribe(
          todosProdutos => {
            this.todosProdutos = todosProdutos;
            this.totalFiltrado = this.contadorPipe.transform(this.totalFiltrado,this.todosProdutos,this.valorFiltro,this.criterioFiltro)
            this.totalDeIndices = Math.ceil(this.todosProdutos.length/this.itemsListaPorVez)
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
    
    console.log(this.produtoSelecionado)
  }

  adicionar(){
    let novoItem: ItemEntrada | ItemVenda | null = null;
    if(this.finalidade === "compra"){
      novoItem = new ItemEntrada();
      novoItem.preco_compra = this.precoCompra;
      novoItem.quantidade = this.quantidade;
      novoItem.produto = this.produtoSelecionado;
      this.fecharModal.emit(novoItem);
    }else{
      if(this.quantidade <= this.produtoSelecionado.qtd_estoque){
        novoItem = new ItemVenda();
        novoItem.quantidade = this.quantidade;
        novoItem.produto = this.produtoSelecionado;
        novoItem.preco_unitario = this.produtoSelecionado.preco_venda;
        this.fecharModal.emit(novoItem);
      }else{
        this.mostrarErro = true;
      }

    }
  
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

  isLoading(){
    return this.produtoService.isLoading;
  }

}
