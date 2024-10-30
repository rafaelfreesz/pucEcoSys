import { Component, OnInit } from '@angular/core';
import { Fornecedor } from 'src/app/models/fornecedor.model';

@Component({
  selector: 'app-lista-fornecedores',
  templateUrl: './lista-fornecedores.component.html',
  styleUrls: ['./lista-fornecedores.component.scss']
})
export class ListaFornecedoresComponent implements OnInit {

  todosFornecedores: Fornecedor[] = [];
  fornecedorSelecionado: Fornecedor | null = null;
  criterioFiltro: string = "razao_social";
  valorFiltro: string = "";
  isNovoFornecedor: boolean = false;
  totalFiltrado: number = 0;

  constructor() {
    for(let i=0; i<10; i++){
      
      const forn = new Fornecedor()
      this.todosFornecedores.push(forn)
    }
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
