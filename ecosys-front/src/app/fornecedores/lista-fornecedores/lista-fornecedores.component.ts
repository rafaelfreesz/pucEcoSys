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
  fornecedorSelecionado: Fornecedor | null = null;
  private fornecedoresAlterados: Subscription
  criterioFiltro: string = "razao_social";
  valorFiltro: string = "";
  isNovoFornecedor: boolean = false;
  totalFiltrado: number = 0;

  constructor(private fornecedorService: FornecedorService) {
    this.fornecedoresAlterados = this.fornecedorService.fornecedoresAlterados.subscribe(
      todosFornecedores => {
        this.todosFornecedores = todosFornecedores
      }
    )
  }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {
    this.fornecedoresAlterados.unsubscribe();
  }

  selecionarFornecedor(fornecedor: Fornecedor){
    this.fornecedorSelecionado = fornecedor;
  }

  prepararCadastro(){
    this.fornecedorSelecionado = new Fornecedor();
    this.isNovoFornecedor = true;
  }

  fecharModal(evento: string){
    if(evento === 'excluir'){
      if(this.fornecedorSelecionado!=null && this.fornecedorSelecionado.id){
        // this.fornecedorService.deletarProduto(this.fornecedorSelecionado.id);
      }
    }else if(evento === 'salvar'){
      if(this.fornecedorSelecionado != null){
        // this.fornecedorService.salvarProduto(this.fornecedorSelecionado);
      }
    }

    this.isNovoFornecedor = false;
    this.fornecedorSelecionado = null;
  }

}
