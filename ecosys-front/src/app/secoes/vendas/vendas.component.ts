import { Component, OnInit } from '@angular/core';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css'],
  providers: [VendaService]
})
export class VendasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
