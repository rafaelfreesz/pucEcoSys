import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResumoDiario } from 'src/app/models/resumo_diario';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-resumo-do-dia',
  templateUrl: './resumo-do-dia.component.html',
  styleUrls: ['./resumo-do-dia.component.css']
})
export class ResumoDoDiaComponent implements OnInit, OnDestroy {

  dados: ResumoDiario = new ResumoDiario();
  private dadosAlterados: Subscription;
  isCarregando = true;

  constructor(private homeService: HomeService) {
    this.dadosAlterados = this.homeService.dadosDiariosAlterados.subscribe(
      dados => {
        this.dados = dados
        this.isCarregando = false;
      }
    )
  }
  
  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.dadosAlterados.unsubscribe();
  }

}
