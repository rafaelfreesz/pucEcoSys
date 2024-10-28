import { Injectable } from "@angular/core";
import { Produto } from "../models/produto.model";
import { Observable, Subject } from "rxjs";
import { HttpService } from "./http.service";

@Injectable()
export class ProdutoService{
    
    produtosAlterados: Subject<Produto[]> = new Subject<Produto[]>()
    private todosProdutos: Produto[] = []

    constructor(private httpService: HttpService){
        this.buscarTodosProdutos();
    }
    

    buscarTodosProdutos(): void{
        this.httpService.getTodosProdutos().subscribe( todosProdutos => {
            this.todosProdutos = todosProdutos
            this.produtosAlterados.next(this.todosProdutos.slice());
        })
    }

    deletarProduto(id: number): void{
        this.httpService.deleteProduto(id).subscribe( todosProdutos => {
            this.todosProdutos = todosProdutos
            this.produtosAlterados.next(this.todosProdutos.slice());
        })
    }

    salvarProduto(produto: Produto): void{
        this.httpService.updateProduto(produto).subscribe( todosProdutos => {
            this.todosProdutos = todosProdutos
            this.produtosAlterados.next(this.todosProdutos.slice());
        });
    }
}