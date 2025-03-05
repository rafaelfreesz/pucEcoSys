import { Injectable } from "@angular/core";
import { Produto } from "../models/produto.model";
import { Subject } from "rxjs";
import { HttpService } from "./http.service";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class ProdutoService{
    
    listaProdutosAlterada: Subject<Produto[]> = new Subject<Produto[]>()
    private todosProdutos: Produto[] = []

    private produtoSelecionado: Produto | null = null;
    produtoFoiSelecionado: Subject<Produto | null> = new Subject<Produto | null>();

    isCarregando: boolean = true;


    constructor(private httpService: HttpService, private sanitizer: DomSanitizer){
        this.buscarTodosProdutos();
    }
    

    buscarTodosProdutos(): void{
        this.isCarregando = true;
        this.httpService.getTodosProdutos().subscribe( todosProdutos => {
            this.todosProdutos = todosProdutos;
            this.converterBase64ParaImagem();
            this.listaProdutosAlterada.next(this.todosProdutos.slice());
            this.isCarregando = false;
        })
    }
    
    async salvarProduto(produto: Produto){
        const produto_tratado = {
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao, 
            preco_venda: produto.preco_venda, 
            qtd_estoque: produto.qtd_estoque, 
            imagem: await this.converterImagemParaBase64(produto.imagem)
        }
        console.log(produto_tratado)
        if(produto.id === -1){
            this.httpService.insertProduto(produto).subscribe( () => {
                this.buscarTodosProdutos()
                this.produtoSelecionado = null
                this.produtoFoiSelecionado.next(this.produtoSelecionado);
            });
        }else{
            this.httpService.updateProduto(produto_tratado).subscribe( () => {
                this.buscarTodosProdutos();
                this.produtoSelecionado = null;
                this.produtoFoiSelecionado.next(this.produtoSelecionado);
            });
        }
    }

    excluirProduto(): void{
        if(this.produtoSelecionado && this.produtoSelecionado.id){
            this.httpService.deleteProduto(this.produtoSelecionado.id).subscribe( () => {
                this.buscarTodosProdutos()
                this.produtoSelecionado = null;
                this.produtoFoiSelecionado.next(this.produtoSelecionado);
            })
        }
    }

    selecionarProduto(produto: Produto){
        this.produtoSelecionado = produto;
        this.produtoFoiSelecionado.next(this.produtoSelecionado)
    }

    liberarProdutoSelecionado(in_alteracao: boolean){
        this.produtoSelecionado = null;
        this.produtoFoiSelecionado.next(null);
        if(in_alteracao){
            this.buscarTodosProdutos();
        }
    }

    converterBase64ParaImagem(): void{

        this.todosProdutos.forEach(
            produto => {
                if(produto.imagem){
                    const byteCharacters = atob(produto.imagem);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                      byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'image/jpeg' });
                    produto.imagemURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
                    
                }
            }
        )
    }

    async converterImagemParaBase64(imagem: any): Promise<string>{
        return new Promise((resolve,reject) => {
            if (imagem instanceof Blob){

                const leitor = new FileReader();
    
                leitor.onload = (e: any) => {
                    const arquivoBase64 = e.target.result.split(',')[1];
                    resolve(arquivoBase64)
                };
                
                leitor.onerror = (erro) => {
                    reject(erro);
                };
                leitor.readAsDataURL(imagem);
            }else{
                resolve(imagem)
            }
        })
      
    
    }

}