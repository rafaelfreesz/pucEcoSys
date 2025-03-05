import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProdutoService } from 'src/app/services/produto.service';


@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.scss']
})
export class ModalProdutoComponent implements OnInit, OnDestroy {

  produto: any = null;
  produtoFoiSelecionado: Subscription

  conteudoFormulario: FormGroup | any;
  inEdicao: boolean = false;
  inHouveAlteracao: boolean = false;

  constructor(private produtoService: ProdutoService) {
    this.produtoFoiSelecionado = this.produtoService.produtoFoiSelecionado.subscribe(
      produtoSelecionado =>
      {
        this.produto = produtoSelecionado;
        if(this.produto && this.produto.id === this.produtoService.proximo_id){
          this.inEdicao = true;
        }
        if(this.produto){
          this.popularCampos();
        }
      }
    )
  }
  
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.produtoFoiSelecionado.unsubscribe();
  }

  temProdutoSelecionado(): boolean{
    return this.produto !== null;
  }

  fechar(){
    this.produtoService.liberarProdutoSelecionado(this.inHouveAlteracao)
    this.inEdicao = false;
  }

  excluir(){
    this.produtoService.excluirProduto();
  }
  
  iniciarEdicao(){
    this.inEdicao = true
  }

  submeterFormulario(){
    this.atribuirFormularioAoProduto();
    this.produtoService.salvarProduto(this.produto)
  }

  selecionarImagem(e: any){
    const imagem = e.target.files[0]
    
    if (imagem) {

      this.produto.imagem = imagem;

      const reader = new FileReader();

      reader.onload = (e:any) => {
        this.produto.imagemURL = e.target.result;
      }
      reader.readAsDataURL(imagem);
    }
  }
  
  atribuirFormularioAoProduto(){
    this.produto.nome = this.conteudoFormulario.value.nome;
    this.produto.descricao = this.conteudoFormulario.value.descricao;
    this.produto.preco_venda = this.conteudoFormulario.value.preco_venda;
    this.produto.qtd_estoque = this.conteudoFormulario.value.qtd_estoque;
  }

  popularCampos(){
    if(this.produto){
      this.conteudoFormulario = new FormGroup({
        'nome': new FormControl(this.produto.nome,Validators.required),
        'descricao': new FormControl(this.produto.descricao),
        'preco_venda': new FormControl(this.produto.preco_venda,[Validators.required,Validators.min(0.01)]),
        'qtd_estoque': new FormControl(this.produto.qtd_estoque),
        'url_imagem': new FormControl(this.produto.imagemURL)
  
      })
    }
  }

}
