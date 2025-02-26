import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Entrada } from 'src/app/models/entrada.model';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista-entradas.component.html',
  styleUrls: ['./lista-entradas.component.css']
})
export class ListaEntradasComponent implements OnInit, OnDestroy {

  todasEntradas: Entrada[] = []
  private entradasAlteradas: Subscription;
  criterioFiltro: string = "nu_nota_fiscal"
  valorFiltro: string = "";
  totalFiltrado: number = 0;
  isCarregando = true;
  
  constructor(private entradaService: EntradaService) {
    this.entradasAlteradas = this.entradaService.listaEntradasAlterada.subscribe(
      todasEntradas => {
        this.todasEntradas = todasEntradas;
        this.isCarregando = false;
      }
    )
  }
  
  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.entradasAlteradas.unsubscribe();
  }

  prepararCadastro(){
    this.entradaService.selecionarEntrada(new Entrada())
  }

  selecionarEntrada(entrada: any){
    this.entradaService.selecionarEntrada(entrada);
  }

}
