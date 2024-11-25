import { Component, OnInit } from '@angular/core';
import { Entrada } from 'src/app/models/entrada.model';

@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista-entradas.component.html',
  styleUrls: ['./lista-entradas.component.css']
})
export class ListaEntradasComponent implements OnInit {

  todasEntradas: Entrada[] = []
  criterioFiltro: string = "nu_nota_fiscal"
  valorFiltro: string = "";
  totalFiltrado: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  prepararCadastro(){

  }

}
