import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumo-do-dia',
  templateUrl: './resumo-do-dia.component.html',
  styleUrls: ['./resumo-do-dia.component.css']
})
export class ResumoDoDiaComponent implements OnInit {

  dados: any = {
    total_valor_vendas: 10,
    total_vendas: 50,
    valor_medio_vendas: 50/10,
    produtos_vendidos: []
  }

  constructor() {
    for(let i = 0; i<15; i++){
      this.dados.produtos_vendidos.push(
        {
          nome: "ABC",
          quantidade: 10,
          valor_total: 10
        }
      )
    }
  }

  ngOnInit(): void {
  }

}
