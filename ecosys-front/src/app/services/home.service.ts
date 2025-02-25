import { Injectable } from '@angular/core';
import { Notificacao } from '../models/notificacao.model';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';

@Injectable()
export class HomeService {

  private dadosNotificacoes: Notificacao[] = []

  notificacoesAlteradas: Subject<Notificacao[]> = new Subject<Notificacao[]>();

  constructor(private httpService: HttpService) {
    this.buscarNotificacoes()
  }

  buscarNotificacoes(): void{
    this.httpService.getStats('notificacoes').subscribe(
      todasNotificacoes => {
        this.dadosNotificacoes = todasNotificacoes;
        this.notificacoesAlteradas.next(this.dadosNotificacoes.slice());
      }
    )
  }
}
