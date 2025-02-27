import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
  inEdicao: boolean = false;
  inHouveAlteracao: boolean = false;


  constructor(private fornecedorService: FornecedorService) {
    this.fornecedorFoiSelecionado = this.fornecedorService.fornecedorFoiSelecionado.subscribe(
      fornecedorSelecionado =>
        {
          this.fornecedor = fornecedorSelecionado
          if(this.fornecedor && this.fornecedor.id === -1){
            this.inEdicao = true;
          }
          if(this.fornecedor){
            this.popularCampos();
          }
        }
    )
  }

  ngOnInit(): void {    
  }

  ngOnDestroy(): void {
    this.fornecedorService.fornecedorFoiSelecionado.unsubscribe()
  }

  temFornecedorSelecionado(): boolean{
    return this.fornecedor !== null;
  }

  fechar(){

    this.fornecedorService.liberarFornecedorSelecionado(this.inHouveAlteracao)
    this.inEdicao = false;

  }

  excluir(){
    this.fornecedorService.excluirFornecedor();
  }

  iniciarEdicao(){
    this.inEdicao = true
  }

  submeterFormulario(){
    this.atribuirFormularioAoFornecedor();
    this.fornecedorService.salvarFornecedor(this.fornecedor)
  }


  getContatos(){
    return this.conteudoFormulario.get('contatos').controls
  }

  
  private popularCampos(){
    if(this.fornecedor){

      this.conteudoFormulario = new FormGroup({
        'cnpj': new FormControl(this.fornecedor.cnpj,[Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
        'razao_social': new FormControl(this.fornecedor.razao_social, Validators.required),
        'nome_empresarial': new FormControl(this.fornecedor.nome_empresarial, Validators.required),
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

  private atribuirFormularioAoFornecedor(){
    this.fornecedor.cnpj = this.conteudoFormulario.value.cnpj
    this.fornecedor.razao_social = this.conteudoFormulario.value.razao_social
    this.fornecedor.nome_empresarial = this.conteudoFormulario.value.nome_empresarial
    this.fornecedor.endereco.logradouro = this.conteudoFormulario.value.endereco.logradouro
    this.fornecedor.endereco.numero = this.conteudoFormulario.value.endereco.numero
    this.fornecedor.endereco.complemento = this.conteudoFormulario.value.endereco.complemento
    this.fornecedor.endereco.cep = this.conteudoFormulario.value.endereco.cep
    this.fornecedor.endereco.bairro = this.conteudoFormulario.value.endereco.bairro
    this.fornecedor.endereco.cidade = this.conteudoFormulario.value.endereco.cidade
    this.fornecedor.endereco.estado = this.conteudoFormulario.value.endereco.estado
  }

  private buildContatosArray(): FormGroup[]{
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

    if(this.fornecedor.id === -1){ //fornecedor novo

      this.fornecedor.contatos.push(novoContato)
      const control = new FormGroup({
        'id': new FormControl(novoContato.id),
        'tipo': new FormControl(novoContato.tipo),
        'valor': new FormControl(novoContato.valor)
      });

      (<FormArray>this.conteudoFormulario.get('contatos').push(control));

    }else{ //fornecedorJaExistente

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
  
  }

  excluirContato(i: number): void{

    let contato = this.conteudoFormulario.value.contatos[i]
    
    if(this.fornecedor.id === -1){

      this.fornecedor.contatos.splice(i,0)
      this.conteudoFormulario.controls.contatos.removeAt(i)

    }else{

      this.fornecedorService.excluirContato(contato.id).then(
        () => {
          this.conteudoFormulario.controls.contatos.removeAt(i)
          this.inHouveAlteracao = true;
        }
      )

    }

    
  }

}
