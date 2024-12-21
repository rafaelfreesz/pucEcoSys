import { Injectable } from '@angular/core';
import { Entrada } from '../models/entrada.model';
import { Subject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class EntradaService {

  listaEntradasAlterada: Subject<Entrada[]> = new Subject<Entrada[]>();
  private todasEntradas: Entrada[] = [];

  entradaFoiSelecionada: Subject<Entrada | null> = new Subject<Entrada | null>();
  private entradaSelecionada: Entrada | null = null;

  constructor(private httpService: HttpService) {
    this.buscarTodasEntradas();
  }


  buscarTodasEntradas(): void{
    this.httpService.getTodasEntradas().subscribe(
      todasEntradas => {
        this.todasEntradas = todasEntradas;
        this.listaEntradasAlterada.next(this.todasEntradas.slice())
      }
    )
  }

  selecionarEntrada(entrada: Entrada){
    this.entradaSelecionada = entrada;
    this.entradaFoiSelecionada.next(this.entradaSelecionada)
  }

  liberaEntradaSelecionada(comando: string){
    this.entradaSelecionada = null;
    this.entradaFoiSelecionada.next(null);
  }
}
