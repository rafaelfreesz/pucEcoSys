import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Venda } from 'src/app/models/venda.model';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-modal-venda',
  templateUrl: './modal-venda.component.html',
  styleUrls: ['./modal-venda.component.css']
})
export class ModalVendaComponent implements OnInit {

  vendaNova: Venda | null = null
  vendaFoiCriada: Subscription;
  constructor(private vendaService: VendaService) {
    this.vendaFoiCriada = vendaService.vendaFoiCriada.subscribe(
      () => {
        this.vendaNova = new Venda();
      }
    )
  }

  ngOnInit(): void {
  }

  fechar():void {
    this.vendaNova = null;
  }

}
