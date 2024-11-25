import { Injectable } from '@angular/core';
import { Entrada } from '../models/entrada.model';
import { Subject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class EntradaService {

  entradasAlteradas: Subject<Entrada[]> = new Subject<Entrada[]>()
  private todasEntradas: Entrada[] = []

  constructor(private httpService: HttpService) { }


  buscarTodasEntradas(): void{
    this.httpService.getTodasEntradas().subscribe(
      todasEntradas => {
        this.todasEntradas = todasEntradas;
        this.entradasAlteradas.next(this.todasEntradas.slice())
      }
    )
  }
}
