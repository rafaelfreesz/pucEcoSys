import { Injectable } from '@angular/core';
import { Notificacao } from '../models/notificacao.model';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import { ResumoDiario } from '../models/resumo_diario';

@Injectable()
export class HomeService {

  private dadosNotificacoes: Notificacao[] = []
  private dadosResumoDiario: ResumoDiario | null = null

  notificacoesAlteradas: Subject<Notificacao[]> = new Subject<Notificacao[]>();
  dadosDiariosAlterados: Subject<ResumoDiario> = new Subject<ResumoDiario>();

  constructor(private httpService: HttpService) {
    this.buscarNotificacoes()
    this.buscarResumoDiario()
  }

  buscarNotificacoes(): void{
    this.httpService.getNotificacoes().subscribe(
      (notificacoes: Notificacao[]) => {
        this.dadosNotificacoes = notificacoes;
        this.notificacoesAlteradas.next(this.dadosNotificacoes.slice());
      }
    )
  }

  buscarResumoDiario(){
    this.httpService.getResumoDiario().subscribe(
      (resumoDiario: ResumoDiario) => {
        this.dadosResumoDiario = resumoDiario;
        this.dadosDiariosAlterados.next({...this.dadosResumoDiario});
      }
    )
  }
}
