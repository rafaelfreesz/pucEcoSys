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
  idsItemsPraExcluir: string[] = []

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
        'razao_social': new FormControl(this.entrada.fornecedor.razao_social),
      }),
      'items_entrada': new FormArray(this.buildItemsEntradaArray())
    })

  }

  private buildItemsEntradaArray(): FormGroup[]{
    let itemsArray: FormGroup[] = []

    if(this.entrada !== null){
      this.entrada.items_entrada.forEach(
        (item: any) => {
          itemsArray.push( new FormGroup({
            'id': new FormControl(item.id),
            'quantidade': new FormControl(item.quantidade),
            'preco_compra': new FormControl(item.preco_compra),
            'valor_total': new FormControl(item.valor_total_item()),
            'nome_produto': new FormControl(item.produto.nome),
            'in_excluir': new FormControl(false)
          })

          )
        }
      )
    }

    return itemsArray;
  }

  submeterFormulario(){
    console.log(this.conteudoFormulario)
    console.log('submetido')
    console.log(this.conteudoFormulario.value.dt_hr_entrada)
  }

  excluirItem(idItem: string){
    this.idsItemsPraExcluir.push(idItem)
    //Recriando o vetor para disparar o pipe
    this.idsItemsPraExcluir = this.idsItemsPraExcluir.filter(elemento => true)
    this.conteudoFormulario.markAsDirty();
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

  valor_total_nota(){
    let total = 0
    for (let item of this.entrada.items_entrada){
      total+= this.idsItemsPraExcluir.includes(item.id)? 0 : item.valor_total_item()
    }
    return total;
  }

}
