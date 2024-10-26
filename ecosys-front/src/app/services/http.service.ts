import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Produto } from "../models/produto.model";

@Injectable()
export class HttpService{

    constructor(private http: HttpClient){}

    getTodosProdutos() {

        return this.http.get<any>('http://localhost:3000/produtos')
        .pipe(
            map( resposta => {
                const produtos: Produto[] = []

                for (const i in resposta){
                    const produto:Produto = new Produto();

                    produto.id = resposta[i].id;
                    produto.nome = resposta[i].nome;
                    produto.descricao = resposta[i].descricao;
                    produto.qtd_estoque= resposta[i].qtd_estoque
                    produto.preco_venda = resposta[i].preco_venda;

                    produtos.push(produto);
                }

                return produtos
            })
        )

    }

}