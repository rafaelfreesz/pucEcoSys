import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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

  conteudoFormulario: FormGroup | any;
  inEdicao: boolean = true;

  constructor(private entradaService: EntradaService) {
    this.entradaFoiSelecionada = this.entradaService.entradaFoiSelecionada.subscribe(
      entrada => {
        this.entrada = entrada;
        if(this.entrada){
          this.popularCampos();
        }
        
      }
    )
  }

  ngOnInit(): void {
  }

  fechar(){
    this.entradaService.liberaEntradaSelecionada('fechar')
  }
  
  excluir(){

  }

  temEntradaSelecionada(){
    return this.entrada != null;
  }

  iniciarEdicao(){
    this.inEdicao = true; 
  }

  private popularCampos(){
    this.conteudoFormulario = new FormGroup({
      'dt_hr_entrada': new FormControl(this.entrada.dt_hr_entrada),
      'nu_nota_fiscal': new FormControl(this.entrada.nu_nota_fiscal)
    })
  }

  submeterFormulario(){
    console.log('submetido')
  }

  excluirContato(i: number){
    console.log(i)
  }


}
