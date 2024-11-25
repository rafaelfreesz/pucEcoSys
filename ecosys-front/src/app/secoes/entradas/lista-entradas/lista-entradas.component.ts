import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Entrada } from 'src/app/models/entrada.model';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista-entradas.component.html',
  styleUrls: ['./lista-entradas.component.css']
})
export class ListaEntradasComponent implements OnInit {

  todasEntradas: Entrada[] = []
  private entradasAlteradas: Subscription;
  criterioFiltro: string = "nu_nota_fiscal"
  valorFiltro: string = "";
  totalFiltrado: number = 0;

  constructor(private entradaService: EntradaService) {
    this.entradasAlteradas = this.entradaService.entradasAlteradas.subscribe(
      todasEntradas => {
        this.todasEntradas = todasEntradas;
        this.entradaService.selecionarEntrada(this.todasEntradas[0])
      }
    )
  }

  ngOnInit(): void {
  }

  prepararCadastro(){

  }

  selecionarEntrada(entrada: any){
    this.entradaService.selecionarEntrada(entrada);
  }

}
