import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Fornecedor } from 'src/app/models/fornecedor.model';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-lista-fornecedores',
  templateUrl: './lista-fornecedores.component.html',
  styleUrls: ['./lista-fornecedores.component.scss']
})
export class ListaFornecedoresComponent implements OnInit, OnDestroy {

  todosFornecedores: Fornecedor[] = [];
  private listaFornecedoresAlterada: Subscription
  criterioFiltro: string = "razao_social";
  valorFiltro: string = "";
  totalFiltrado: number = 0;

  constructor(private fornecedorService: FornecedorService) {}
  
  ngOnInit(): void {
    this.todosFornecedores = this.fornecedorService.getTodosFornecedores();
    this.listaFornecedoresAlterada = this.fornecedorService.listaFornecedoresAlterada.subscribe(
      todosFornecedores => {
        this.todosFornecedores = todosFornecedores
      }
    )
  
  }

  ngOnDestroy(): void {
    this.listaFornecedoresAlterada.unsubscribe();
  }

  selecionarFornecedor(fornecedor: Fornecedor){
    this.fornecedorService.selecionarFornecedor(fornecedor)
  }

  prepararCadastro(){
    this.fornecedorService.selecionarFornecedor(new Fornecedor());
  }


  isLoading(): boolean{
    return this.fornecedorService.isLoading;
  }

}
