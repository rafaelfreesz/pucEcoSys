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
  private fornecedoresAlterados: Subscription
  criterioFiltro: string = "razao_social";
  valorFiltro: string = "";
  totalFiltrado: number = 0;
  isCarregando = true;

  constructor(private fornecedorService: FornecedorService) {
    this.fornecedoresAlterados = this.fornecedorService.fornecedoresAlterados.subscribe(
      todosFornecedores => {
        this.todosFornecedores = todosFornecedores
        this.isCarregando = false;
        setTimeout(()=>{this.selecionarFornecedor(todosFornecedores[0])},500)
        //TODO remover
      }
    )
  }

  ngOnInit(): void {
    
  
  }

  ngOnDestroy(): void {
    this.fornecedoresAlterados.unsubscribe();
  }

  selecionarFornecedor(fornecedor: Fornecedor){
    
    this.fornecedorService.selecionarFornecedor(fornecedor)
  }

  prepararCadastro(){
    this.fornecedorService.selecionarFornecedor(new Fornecedor());
  }

  fecharModal(evento: string){

    // if(evento === "fecharComAlteracao"){
    //   this.fornecedorService.buscarTodosFornecedores();
    // }else if(evento === 'excluir'){
    //   if(this.fornecedorSelecionado!=null && this.fornecedorSelecionado.id){
    //     // this.fornecedorService.deletarProduto(this.fornecedorSelecionado.id);
    //   }
    // }else if(evento === 'salvar'){
    //   if(this.fornecedorSelecionado != null){
    //     // this.fornecedorService.salvarProduto(this.fornecedorSelecionado);
    //   }
    // }

    // this.isNovoFornecedor = false;
    // this.fornecedorSelecionado = null;
  }


}
