import { Component, OnInit } from '@angular/core';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css'],
  providers: [EntradaService]
})
export class EntradasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
