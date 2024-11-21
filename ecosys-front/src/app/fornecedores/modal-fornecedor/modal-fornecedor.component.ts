import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Contato } from 'src/app/models/contato.model';
import { Fornecedor } from 'src/app/models/fornecedor.model';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-modal-fornecedor',
  templateUrl: './modal-fornecedor.component.html',
  styleUrls: ['./modal-fornecedor.component.scss']
})
export class ModalFornecedorComponent implements OnInit, OnDestroy {

  fornecedor: any = null;
  fornecedorFoiSelecionado: Subscription;
  
  conteudoFormulario: FormGroup | any;
  @Input() inEdicao: boolean = false;
  inHouveAlteracao: boolean = false;


  constructor(private fornecedorService: FornecedorService) {
    this.fornecedorFoiSelecionado = this.fornecedorService.fornecedorFoiSeleciontado.subscribe(
      fornecedorSelecionado =>
        {
          this.fornecedor = fornecedorSelecionado
          if(this.fornecedor){
            this.popularCampos();
          }
        }
    )
  }

  ngOnInit(): void {
    this.inEdicao = true    
  }

  ngOnDestroy(): void {
    this.fornecedorService.fornecedorFoiSeleciontado.unsubscribe()
  }

  temFornecedorSelecionado(): boolean{
    return this.fornecedor !== null;
  }

  comando(comando: string){
    if(comando === 'fechar' && this.inHouveAlteracao){
      comando = "fecharComAlteracao"
    }
    this.fornecedorService.liberarFornecedorSelecionado('fechar')
    // this.onComando.emit(comando);
  }

  iniciarEdicao(){
    this.inEdicao = true
  }

  submeterFormulario(){
    console.log(this.conteudoFormulario.value)
  }


  getContatos(){
    return this.conteudoFormulario.get('contatos').controls
  }

  
  private popularCampos(){
    if(this.fornecedor){

      this.conteudoFormulario = new FormGroup({
        'cnpj': new FormControl(this.fornecedor.cnpj),
        'razao_social': new FormControl(this.fornecedor.razao_social),
        'nome_empresarial': new FormControl(this.fornecedor.nome_empresarial),
        'endereco': new FormGroup({
          'logradouro': new FormControl(this.fornecedor.endereco.logradouro),
          'numero': new FormControl(this.fornecedor.endereco.numero),
          'complemento': new FormControl(this.fornecedor.endereco.complemento),
          'cep': new FormControl(this.fornecedor.endereco.cep),
          'bairro': new FormControl(this.fornecedor.endereco.bairro),
          'cidade': new FormControl(this.fornecedor.endereco.cidade),
          'estado': new FormControl(this.fornecedor.endereco.estado),
        }),
        'contato-novo': new FormGroup({
          'tipo-novo': new FormControl(),      
          'valor-novo': new FormControl(),      
      }),
        'contatos': new FormArray(this.buildContatosArray())
        
      })
    
    }
  }

  private buildContatosArray(){
    let contatosArray: FormGroup[] = []

    if(this.fornecedor !== null){
      this.fornecedor.contatos.forEach( (contato: {'id': Number, 'tipo': String, 'valor': String}) => {
        contatosArray.push(new FormGroup({
          'id': new FormControl(contato.id),
          'tipo': new FormControl(contato.tipo),
          'valor': new FormControl(contato.valor),
          
        }))
      })
    }

    return contatosArray;

  }

  incluirContato(): void{

    let novoContato = new Contato();

    novoContato.tipo = this.conteudoFormulario.value['contato-novo']['tipo-novo']
    novoContato.valor = this.conteudoFormulario.value['contato-novo']['valor-novo']

    
    this.fornecedorService.salvarContato(novoContato,this.fornecedor.id).then(
      (resp: any) => {
        novoContato.id = resp.id;
        this.fornecedor.contatos.push(novoContato);
        const control = new FormGroup({
          'id': new FormControl(novoContato.id),
          'tipo': new FormControl(novoContato.tipo),
          'valor': new FormControl(novoContato.valor)
        });
        (<FormArray>this.conteudoFormulario.get('contatos').push(control));
        this.inHouveAlteracao = true
      }
    )

  
  }

  excluirContato(i: number): void{

    let contato = this.conteudoFormulario.value.contatos[i]
    
    this.fornecedorService.excluirContato(contato.id).then(
      () => {
        this.conteudoFormulario.controls.contatos.removeAt(i)
        this.inHouveAlteracao = true;
      }
    )
    
  }

}
