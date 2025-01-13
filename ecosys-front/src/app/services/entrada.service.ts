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
    this.entradaFoiSelecionada.next({...entrada})
  }

  liberaEntradaSelecionada(){
    this.entradaSelecionada = null;
    this.entradaFoiSelecionada.next(null);
  }

  excluirEntrada(entrada: Entrada){
    if(entrada.id){
      this.httpService.deleteEntrada(entrada.id).subscribe(
        todasEntradas =>{
          this.todasEntradas = todasEntradas
          this.listaEntradasAlterada.next(this.todasEntradas.slice())
          //TODO Tratar depois a regra de negocio para descontar do estoque entradas que foram computadas
        }
      );
    }
  }
}
