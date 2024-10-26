import { Injectable } from "@angular/core";
import { Produto } from "../models/produto.model";
import { Observable, Subject } from "rxjs";
import { HttpService } from "./http.service";

@Injectable()
export class ProdutoService{
    
    produtosAlterados: Subject<Produto[]> = new Subject<Produto[]>()
    private todosProdutos: Produto[] = []

    constructor(private httpService: HttpService){
        this.getTodosProdutos();
    }

    private getTodosProdutos(){
        this.httpService.getTodosProdutos().subscribe( todosProdutos => {
            this.todosProdutos = todosProdutos
            this.produtosAlterados.next(this.todosProdutos.slice());
        })
    }
}