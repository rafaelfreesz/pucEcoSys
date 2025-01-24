import { Injectable } from '@angular/core';
import { Venda } from '../models/venda.model';
import { Subject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class VendaService {
  
  listaVendasAlterada: Subject<Venda[]> = new Subject<Venda[]>();
  todasVendas: Venda[] = [];

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

  
}
