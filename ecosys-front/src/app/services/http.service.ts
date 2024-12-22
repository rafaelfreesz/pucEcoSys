import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Produto } from "../models/produto.model";
import { Fornecedor } from "../models/fornecedor.model";
import { Endereco } from "../models/endereco.model";
import { Contato } from "../models/contato.model";
import { Entrada } from "../models/entrada.model";
import { HTTPResponseParser } from "../utils/http_response_parser";

@Injectable()
export class HttpService{

    constructor(private http: HttpClient){}

    //PRODUTOS
    getTodosProdutos() {

        return this.http.get<any>('http://localhost:3000/produtos')
        .pipe(
            map( HTTPResponseParser.buildListaProduto )
        )

    }

    deleteProduto(id: number){
        return this.http.delete<any>(`http://localhost:3000/produtos/${id}`)
        .pipe(
            map( HTTPResponseParser.buildListaProduto )
        )
    }

    updateProduto(produto: Produto){
        const id = produto.id;
        delete produto.id
        return this.http.put(`http://localhost:3000/produtos/${id}`,produto)
        .pipe(
            map( HTTPResponseParser.buildListaProduto )
        )
    }

    insertProduto(produto: Produto){
        return this.http.post(`http://localhost:3000/produtos/`,produto)
        .pipe(
            map( HTTPResponseParser.buildListaProduto )
        )
    }

    //FORNECEDORES

    getTodosFornecedores() {

        return this.http.get<any>('http://localhost:3000/fornecedores')
        .pipe(
            map( HTTPResponseParser.buildListaFornecedor )
        )

    }

    insertFornecedor(fornecedor: Fornecedor){
        return this.http.post('http://localhost:3000/fornecedores',fornecedor)
    }

    updateFornecedor(fornecedor: Fornecedor){
        return this.http.put(`http://localhost:3000/fornecedores/${fornecedor.id}`,fornecedor)
    }

    deleteFornecedor(idFornecedor: number){
        return this.http.delete<any>(`http://localhost:3000/fornecedores/${idFornecedor}`)
    }

    deleteContato(idContato: number){
        return this.http.delete<any>(`http://localhost:3000/contatos/${idContato}`)
    }

    salvarContato(contato: Contato, idFornecedor: number){
        return this.http.post<any>(`http://localhost:3000/contatos/`,
            {
                'contato': contato,
                'fk_fornecedor': idFornecedor
            }
        )
    }

    //ENTRADAS
   

    getTodasEntradas() {

        return this.http.get<any>('http://localhost:3000/entradas')
        .pipe(
            map( HTTPResponseParser.buildListaEntradas )
        )

    }

    deleteEntrada(idEntrada: number){
        return this.http.delete<any>(`http://localhost:3000/entradas/${idEntrada}`)
        .pipe(
            map( HTTPResponseParser.buildListaEntradas )
        )
    }


    

}