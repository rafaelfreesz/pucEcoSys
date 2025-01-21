import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Entrada } from 'src/app/models/entrada.model';
import { Fornecedor } from 'src/app/models/fornecedor.model';
import { ItemEntrada } from 'src/app/models/item_entrada.model';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-modal-entrada',
  templateUrl: './modal-entrada.component.html',
  styleUrls: ['./modal-entrada.component.scss']
})
export class ModalEntradaComponent implements OnInit{

  entrada: any = null;
  entradaFoiSelecionada: Subscription;
  mostrarModalTrocaFornecedor: boolean = false;
  mostrarModalItem: boolean = false;

  conteudoFormulario: FormGroup | any;
  inEdicao: boolean = false;
  itemsPraExcluir: any[] = []

  constructor(private entradaService: EntradaService) {
    this.entradaFoiSelecionada = this.entradaService.entradaFoiSelecionada.subscribe(
      entrada => {
        this.entrada = entrada;
        if(this.entrada){
          if(this.entrada.id == -1){
            this.inEdicao = true;
            this.popularCamposCadastro();
          }else{
            this.popularCamposEdicao();
          }
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

  private popularCamposCadastro(){
    this.conteudoFormulario = new FormGroup({
      'dt_hr_entrada': new FormControl(""),
      'nu_nota_fiscal': new FormControl(""),
      'fornecedor': new FormGroup({
        'id': new FormControl(""),
        'nome_empresarial': new FormControl(""),
        'cnpj': new FormControl(""),
        'razao_social': new FormControl("")
      })
    })

  }

  private popularCamposEdicao(){
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
    this.formularioPraEntrada();
    this.entradaService.salvarEntrada(this.entrada, this.itemsPraExcluir)
  }

  excluirItem(item: any){
    
    //Quando o elemento ainda não ta persistido no sistema
    if (item.id === -1){
      this.entrada.items_entrada = this.entrada.items_entrada.filter(
        (elemento: any) => {
          return elemento!=item
        })
      
    }else{
      this.itemsPraExcluir.push(item)
      //Recriando o vetor para disparar o pipe
      this.itemsPraExcluir = this.itemsPraExcluir.filter(() => true)
      this.conteudoFormulario.markAsDirty();
    }
  }

  mostrarModalAlterarFornecedor(){
    this.mostrarModalTrocaFornecedor = true;
  }

  mostrarModalIncluirItem(){
    this.mostrarModalItem = true;
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

  fecharModalIncluirItem(item: any){
    if(item){
      this.entrada.items_entrada.push(item)
      this.entrada.items_entrada = this.entrada.items_entrada.filter((elemento: any) => true)
      this.conteudoFormulario.markAsDirty()
    }
    this.mostrarModalItem = false
  }

  inFoiAlterado(): boolean{
    return this.conteudoFormulario.dirty
  }

  valor_total_nota(){
    let total = 0
    for (let item of this.entrada.items_entrada){
      total+= this.itemsPraExcluir.includes(item)? 0 : item.valor_total_item()
    }
    return total;
  }


  formularioPraEntrada(){
    this.entrada.dt_hr_entrada = this.conteudoFormulario.value.dt_hr_entrada;
    this.entrada.nu_nota_fiscal = this.conteudoFormulario.value.nu_nota_fiscal;
    this.entrada.fornecedor.id = (this.conteudoFormulario.value.fornecedor.id);
  }

  ehNovo():boolean{
    if(this.entrada){
      return this.entrada.id == -1
    }
    return false
  }

}
