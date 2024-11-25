import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-modal-entrada',
  templateUrl: './modal-entrada.component.html',
  styleUrls: ['./modal-entrada.component.css']
})
export class ModalEntradaComponent implements OnInit {

  entrada: any = null;
  entradaFoiSelecionada: Subscription

  constructor(private entradaService: EntradaService) {
    this.entradaFoiSelecionada = this.entradaService.entradaFoiSelecionada.subscribe(
      entrada => {
        this.entrada = entrada
        console.log(this.entrada)
      }
    )
  }

  ngOnInit(): void {
  }

}
