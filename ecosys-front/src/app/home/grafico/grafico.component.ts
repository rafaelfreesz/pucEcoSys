import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js'
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';

Chart.register(...registerables)
@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  public config: any;
  chart: any;

  dados: any[] = []

  graficoValorVendaDataAlterado: Subscription

  constructor(private homeService: HomeService) {
    this.graficoValorVendaDataAlterado = this.homeService.graficoValorVendaDataAlterado.subscribe(
      dados => {
        this.dados = dados
        this.montarGrafico();
      }
    )
    const datas = this.dados.map(dado => dado.data_venda)
  }

  ngOnInit(): void {
    
  }

  montarGrafico(){
    this.config = {
        type: 'line',
        data: {
          labels: this.dados.map(dado => dado.data_venda),
          datasets: [
            {
              label: "Venda diária",
              data: this.dados.map( dado => dado.total),
              backgroundColor: 'blue'
            },

          ]
        }
      }
      this.chart = new Chart('chart',this.config)

  }

}
