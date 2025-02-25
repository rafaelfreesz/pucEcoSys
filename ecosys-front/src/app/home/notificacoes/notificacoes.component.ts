import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notificacao } from 'src/app/models/notificacao.model';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.css']
})
export class NotificacoesComponent implements OnInit {

  dados: Notificacao[] = []
  private dadosAlterados: Subscription;

  constructor(private homeService: HomeService) {
    this.dadosAlterados = this.homeService.notificacoesAlteradas.subscribe(
      dados => {
        this.dados = dados;
      }
    )
  }

  ngOnInit(): void {
  }

}
