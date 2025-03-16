import { Injectable } from '@angular/core';
import { Venda } from '../models/venda.model';
import { Subject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class VendaService {
  
  listaVendasAlterada: Subject<Venda[]> = new Subject<Venda[]>();
  private todasVendas: Venda[] = [];

  vendaFoiCriada: Subject<Venda | null> = new Subject<Venda | null>();
  vendaFoiFinalizada: Subject<null> = new Subject<null>();

  constructor(private httpService: HttpService) {
    this.buscarVendasDia(new Date().toISOString().split('T')[0]);
  }

  buscarVendasDia(data: string): void{
    this.httpService.getVendasDia(data).subscribe(
      todasVendas => {
        this.todasVendas = todasVendas;
        this.listaVendasAlterada.next(this.todasVendas.slice());
      }
    )
  }

  prepararCadastro(){
    this.vendaFoiCriada.next();
  }

  salvarVenda(venda: Venda, hoje: string){
    this.httpService.insertVenda(venda).subscribe(
      () => {
        this.buscarVendasDia(hoje);
        this.vendaFoiFinalizada.next();
      }
    )
  }



  
}
