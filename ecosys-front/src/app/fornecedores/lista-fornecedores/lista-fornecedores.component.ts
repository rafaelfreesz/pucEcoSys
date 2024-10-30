import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Fornecedor } from 'src/app/models/fornecedor.model';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-lista-fornecedores',
  templateUrl: './lista-fornecedores.component.html',
  styleUrls: ['./lista-fornecedores.component.scss']
})
export class ListaFornecedoresComponent implements OnInit {

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
    console.log("OLAAAA")
  }

  selecionarFornecedor(fornecedor: Fornecedor){
    this.fornecedorSelecionado = fornecedor;
  }

  prepararCadastro(){
    this.fornecedorSelecionado = new Fornecedor();
    this.isNovoFornecedor = true;
  }

}
