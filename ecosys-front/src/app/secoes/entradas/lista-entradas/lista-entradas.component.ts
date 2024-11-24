import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista-entradas.component.html',
  styleUrls: ['./lista-entradas.component.css']
})
export class ListaEntradasComponent implements OnInit {

  todasEntradas: any[] = []
  criterioFiltro: string = "razao_social"
  valorFiltro: string = "";
  totalFiltrado: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  prepararCadastro(){

  }

}
