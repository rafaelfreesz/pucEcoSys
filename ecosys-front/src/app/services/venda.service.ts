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
    this.buscarTodasVendas();
  }

  buscarTodasVendas(): void{
    this.httpService.getTodasVendas().subscribe(
      todasVendas => {
        this.todasVendas = todasVendas;
        this.listaVendasAlterada.next(this.todasVendas.slice());
      }
    )
  }

  prepararCadastro(){
    this.vendaFoiCriada.next();
  }

  salvarVenda(venda: Venda){
    this.httpService.insertVenda(venda).subscribe(
      todasVendas => {
        this.todasVendas = todasVendas;
        this.listaVendasAlterada.next(this.todasVendas.slice());
        this.vendaFoiFinalizada.next();
      }
    )
  }



  
}
