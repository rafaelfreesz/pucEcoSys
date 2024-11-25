import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-modal-entrada',
  templateUrl: './modal-entrada.component.html',
  styleUrls: ['./modal-entrada.component.scss']
})
export class ModalEntradaComponent implements OnInit {

  entrada: any = null;
  entradaFoiSelecionada: Subscription
  inEdicao: boolean = false

  constructor(private entradaService: EntradaService) {
    this.entradaFoiSelecionada = this.entradaService.entradaFoiSelecionada.subscribe(
      entrada => {
        this.entrada = entrada
        
      }
    )
  }

  ngOnInit(): void {
  }

  fechar(){
    this.entradaService.liberaEntradaSelecionada('fechar')
  }

  temEntradaSelecionada(){
    return this.entrada != null;
  }

  iniciarEdicao(){
    this.inEdicao = true; 
  }

}
