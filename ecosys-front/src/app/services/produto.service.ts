import { Injectable } from "@angular/core";
import { Produto } from "../models/produto.model";
import { Subject } from "rxjs";
import { HttpService } from "./http.service";

@Injectable()
export class ProdutoService{
    
    listaProdutosAlterada: Subject<Produto[]> = new Subject<Produto[]>()
    private todosProdutos: Produto[] = []

    private produtoSelecionado: Produto | null = null;
    produtoFoiSelecionado: Subject<Produto | null> = new Subject<Produto | null>();

    isCarregando: boolean = true;


    constructor(private httpService: HttpService){
        this.buscarTodosProdutos();
    }
    

    buscarTodosProdutos(): void{
        this.isCarregando = true;
        this.httpService.getTodosProdutos().subscribe( todosProdutos => {
            this.todosProdutos = todosProdutos
            this.listaProdutosAlterada.next(this.todosProdutos.slice());
            this.isCarregando = false;
        })
    }
    
    salvarProduto(produto: Produto): void{
        if(produto.id === -1){
            this.httpService.insertProduto(produto).subscribe( () => {
                this.buscarTodosProdutos()
                this.produtoSelecionado = null
                this.produtoFoiSelecionado.next(this.produtoSelecionado);
            });
        }else{
            this.httpService.updateProduto(produto).subscribe( () => {
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

}