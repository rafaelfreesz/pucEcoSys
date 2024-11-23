import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Produto } from "../models/produto.model";
import { Fornecedor } from "../models/fornecedor.model";
import { Endereco } from "../models/endereco.model";
import { Contato } from "../models/contato.model";

@Injectable()
export class HttpService{

    constructor(private http: HttpClient){}

    //PRODUTOS
    private buildListaProduto(resposta: any){
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
    }

    getTodosProdutos() {

        return this.http.get<any>('http://localhost:3000/produtos')
        .pipe(
            map( this.buildListaProduto )
        )

    }

    deleteProduto(id: number){
        return this.http.delete<any>(`http://localhost:3000/produtos/${id}`)
        .pipe(
            map( this.buildListaProduto )
        )
    }

    updateProduto(produto: Produto){
        const id = produto.id;
        delete produto.id
        return this.http.put(`http://localhost:3000/produtos/${id}`,produto)
        .pipe(
            map( this.buildListaProduto )
        )
    }

    insertProduto(produto: Produto){
        return this.http.post(`http://localhost:3000/produtos/`,produto)
        .pipe(
            map( this.buildListaProduto )
        )
    }

    //FORNECEDORES
    private buildListaFornecedor(resposta: any){
        const fornecedores: Fornecedor[] = []

        for (const i in resposta){
            const fornecedor:Fornecedor = new Fornecedor();

            fornecedor.id = resposta[i].id;
            fornecedor.cnpj = resposta[i].cnpj;
            fornecedor.razao_social = resposta[i].razao_social;
            fornecedor.nome_empresarial= resposta[i].nome_empresarial

            const endereco = new Endereco();

            endereco.id = resposta[i].endereco.id;
            endereco.logradouro = resposta[i].endereco.logradouro;
            endereco.numero = resposta[i].endereco.numero;
            endereco.complemento = resposta[i].endereco.complemento;
            endereco.cep = resposta[i].endereco.cep;
            endereco.bairro = resposta[i].endereco.bairro;
            endereco.cidade = resposta[i].endereco.cidade;
            endereco.estado = resposta[i].endereco.estado;

            fornecedor.endereco = endereco;

            for(let contato of resposta[i].contatos){
                const cont = new Contato();
                cont.id = contato.id;
                cont.tipo = contato.tipo;
                cont.valor = contato.valor;

                fornecedor.contatos.push(cont)
            }

            fornecedores.push(fornecedor);
        }

        return fornecedores
    }

    getTodosFornecedores() {

        return this.http.get<any>('http://localhost:3000/fornecedores')
        .pipe(
            map( this.buildListaFornecedor )
        )

    }

    updateFornecedor(fornecedor: Fornecedor){
        return this.http.put(`http://localhost:3000/fornecedores/${fornecedor.id}`,fornecedor)
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

    // deleteFornecedorProduto(id: number){
    //     return this.http.delete<any>(`http://localhost:3000/produtos/${id}`)
    //     .pipe(
    //         map( this.buildListaProduto )
    //     )
    // }

    // updateFornecedorProduto(produto: Produto){
    //     const id = produto.id;
    //     delete produto.id
    //     return this.http.put(`http://localhost:3000/produtos/${id}`,produto)
    //     .pipe(
    //         map( this.buildListaProduto )
    //     )
    // }

    // insertFornecedorProduto(produto: Produto){
    //     return this.http.post(`http://localhost:3000/produtos/`,produto)
    //     .pipe(
    //         map( this.buildListaProduto )
    //     )
    // }

}