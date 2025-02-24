import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js'

Chart.register(...registerables)
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public config: any = {
    type: 'line',
    data: {
      labels: ["Jan","Feb","Mar","April"],
      datasets: [
        {
          label: "Sales",
          data: ['467','576','572','588'],
          backgroundColor: 'blue'
        },
        {
          label: "Pat",
          data: ['100','200','300','400'],
          backgroundColor: 'red'
        }
      ]
    }
  }
  chart: any;

  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart('chart',this.config)
  }

}
