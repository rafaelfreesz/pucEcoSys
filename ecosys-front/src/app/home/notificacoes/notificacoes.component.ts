import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.css']
})
export class NotificacoesComponent implements OnInit {

  dados: any = [
    {
      produto: "ABCD",
      status: "Estoque baixo",
      qtd_estoque: 100
    }
  ]

  constructor() {
    for(let i=0; i<10;i++){
      this.dados.push(
        {
          produto: "ABCD",
          status: "Estoque baixo",
          qtd_estoque: 100
        }
      )
    }
  }

  ngOnInit(): void {
  }

}
