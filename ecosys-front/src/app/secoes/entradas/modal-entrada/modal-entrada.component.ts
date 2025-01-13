import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-modal-entrada',
  templateUrl: './modal-entrada.component.html',
  styleUrls: ['./modal-entrada.component.scss']
})
export class ModalEntradaComponent implements OnInit{

  entrada: any = null;
  entradaFoiSelecionada: Subscription
  mostrarModalTrocaFornecedor: boolean = false

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
    this.entradaService.liberaEntradaSelecionada();
  }
  
  excluir(){
    this.entradaService.excluirEntrada(this.entrada);
    this.entrada = null;
  }

  temEntradaSelecionada(){
    return this.entrada != null;
  }

  iniciarEdicao(){
    this.inEdicao = true; 
  }

  private popularCampos(){
    this.conteudoFormulario = new FormGroup({
      'dt_hr_entrada': new FormControl(this.entrada.dt_hr_entrada.slice(0,16)),
      'nu_nota_fiscal': new FormControl(this.entrada.nu_nota_fiscal),
      'fornecedor': new FormGroup({
        'id': new FormControl(this.entrada.fornecedor.id),
        'nome_empresarial': new FormControl(this.entrada.fornecedor.nome_empresarial),
        'cnpj': new FormControl(this.entrada.fornecedor.cnpj),
        'razao_social': new FormControl(this.entrada.fornecedor.razao_social)
      })
    })
  }

  submeterFormulario(){
    console.log(this.conteudoFormulario)
    console.log('submetido')
    console.log(this.conteudoFormulario.value.dt_hr_entrada)
  }

  excluirItem(i: number){
    console.log(i)
  }

  mostrarModalAlterarFornecedor(){
    this.mostrarModalTrocaFornecedor = true;
  }

  fecharModalAlterarFornecedor(fornecedor: any){
    if(fornecedor){
      this.entrada.fornecedor = fornecedor
      this.conteudoFormulario.get('fornecedor')?.patchValue(
        {
          'id': fornecedor.id,
          'nome_empresarial': fornecedor.nome_empresarial,
          'cnpj': fornecedor.cnpj,
          'razao_social': fornecedor.razao_social
        }
      )
      this.conteudoFormulario.get('fornecedor')?.markAsDirty()
    }
    this.mostrarModalTrocaFornecedor = false;
  }

  inFoiAlterado(): boolean{
    return this.conteudoFormulario.dirty
  }

}
