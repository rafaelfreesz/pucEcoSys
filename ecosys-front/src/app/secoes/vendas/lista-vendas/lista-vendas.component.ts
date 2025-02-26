import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Venda } from 'src/app/models/venda.model';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-lista-vendas',
  templateUrl: './lista-vendas.component.html',
  styleUrls: ['./lista-vendas.component.css']
})
export class ListaVendasComponent implements OnInit, OnDestroy {

  todasVendas: Venda[] = []
  private vendasAlteradas: Subscription;
  criterioFiltro: string="dt_hr_venda";
  valorFiltro: string="";
  totalFiltrado: number = 0;
  vendaSelecionada: Venda | null = null;
  isCarregando = true;

  constructor(private vendaService: VendaService) {
    this.vendasAlteradas = this.vendaService.listaVendasAlterada.subscribe(
      todasVendas => {
        this.todasVendas = todasVendas;
        this.isCarregando = false;
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vendasAlteradas.unsubscribe();
  }

  selecionarVenda(venda: any): void{
    if(this.vendaSelecionada === venda){
      this.vendaSelecionada = null
    }else{
      this.vendaSelecionada = venda
    }
  }

  prepararCadastro():void{
    this.vendaService.prepararCadastro();
  }

}
