import { Injectable } from '@angular/core';
import { Notificacao } from '../models/notificacao.model';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import { ResumoDiario } from '../models/resumo_diario';

@Injectable()
export class HomeService {

  private dadosNotificacoes: Notificacao[] = []
  private dadosResumoDiario: ResumoDiario | null = null
  private dadosGraficoValorVendaData: any 

  notificacoesAlteradas: Subject<Notificacao[]> = new Subject<Notificacao[]>();
  dadosDiariosAlterados: Subject<ResumoDiario> = new Subject<ResumoDiario>();
  graficoValorVendaDataAlterado: Subject<any[]> = new Subject<any[]>();



  constructor(private httpService: HttpService) {
    this.buscarNotificacoes()
    this.buscarResumoDiario()
    this.buscarValorVendaData();
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

  buscarValorVendaData(){
    const data = new Date();
    const hoje = data.toISOString().split("T")[0];
    data.setDate(data.getDate() - 10);
    const dezDiasAtraz = data.toISOString().split("T")[0];

    this.httpService.getValorVendaData(dezDiasAtraz,hoje).subscribe(
      (valores: any) => {
        this.dadosGraficoValorVendaData = valores;
        this.graficoValorVendaDataAlterado.next(valores.slice());
      }
    )
  }
}
