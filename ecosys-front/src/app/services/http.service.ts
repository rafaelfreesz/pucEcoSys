import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Produto } from "../models/produto.model";
import { Fornecedor } from "../models/fornecedor.model";
import { Contato } from "../models/contato.model";
import { Entrada } from "../models/entrada.model";
import { HTTPResponseParser } from "../utils/http_response_parser";
import { ItemEntrada } from "../models/item_entrada.model";
import { Venda } from "../models/venda.model";
import { ItemVenda } from "../models/item_venda.model";

@Injectable()
export class HttpService{

    constructor(private http: HttpClient){}

    //HOME
    getNotificacoes(): any{

        return this.http.get<any>(`http://localhost:3000/stats/notificacoes`)
        .pipe(
            map( 
                HTTPResponseParser.buildListaNotificacoes
            )
        )
    }
    getResumoDiario(): any{

        return this.http.get<any>(`http://localhost:3000/stats/resumo_diario`)
        .pipe(
            map( 
                HTTPResponseParser.buildResumoDiarioFromResposta
            )
        )
    }

    getValorVendaData(dt_inicio: string, dt_fim: string): any{
        return this.http.get<any>(`http://localhost:3000/stats/grafico/valor_venda_dia?dt_inicio=${dt_inicio}&dt_fim=${dt_fim}`)
        .pipe(
            map(
                HTTPResponseParser.buildValorVendaDataFromResposta
            )
        )
    }

    //PRODUTOS
    getTodosProdutos() {

        return this.http.get<any>('http://localhost:3000/produtos')
        .pipe(
            map( HTTPResponseParser.buildListaProduto )
        )


    }
    getProximoIdDisponivel() {
        return this.http.get<any>('http://localhost:3000/produtos/id/proximo')
        .pipe(
            map( (resposta) => { return resposta[0]} )
        )
    }

    deleteProduto(id: number){
        return this.http.delete<any>(`http://localhost:3000/produtos/${id}`)
        .pipe(
            map( HTTPResponseParser.buildListaProduto )
        )
    }

    updateProduto(produto: any){
        const id = produto.id;
        delete produto.id
        return this.http.put(`http://localhost:3000/produtos/${id}`,produto)
    }

    insertProduto(produto: any){
        return this.http.post(`http://localhost:3000/produtos/`,produto)
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

    updateEntrada(entrada: Entrada, novosItems: ItemEntrada[], itemsPraExcluir: any[]){

        let entradaBody = {
            'entrada':{
                'dt_hr_entrada': entrada.dt_hr_entrada,
                'nu_nota_fiscal': entrada.nu_nota_fiscal,
                'fk_fornecedor': entrada.fornecedor?.id
            },
            'novos_items': novosItems.map((elemento: ItemEntrada) => {
                return {
                    'quantidade': elemento.quantidade,
                    'preco_compra': elemento.preco_compra,
                    'fk_produto': elemento.produto?.id,
                    'fk_entrada': entrada.id,

                }
            }),
            'items_pra_excluir': itemsPraExcluir

        }
        
       return this.http.put(`http://localhost:3000/entradas/${entrada.id}`,entradaBody).pipe(
            map( HTTPResponseParser.buildListaEntradas )
        )

    }

    insertEntrada(entrada: Entrada){
        let entradaBody = {
            'entrada':{
                'dt_hr_entrada': entrada.dt_hr_entrada,
                'nu_nota_fiscal': entrada.nu_nota_fiscal,
                'fk_fornecedor': entrada.fornecedor?.id
            },
            'novos_items': entrada.items_entrada.map((elemento: ItemEntrada) => {
                return {
                    'quantidade': elemento.quantidade,
                    'preco_compra': elemento.preco_compra,
                    'fk_produto': elemento.produto?.id,

                }
            })

        }
        return this.http.post(`http://localhost:3000/entradas`,entradaBody).pipe(
            map( HTTPResponseParser.buildListaEntradas )
        )
    }

    //VENDAS
    getTodasVendas() {

        return this.http.get<any>('http://localhost:3000/vendas')
        .pipe(
            map( HTTPResponseParser.buildListaVendas )
        )

    }

    getVendasDia(data: string) {
        return this.http.get<any>(`http://localhost:3000/vendas/data/${data}`)
        .pipe(
            map( HTTPResponseParser.buildListaVendas )
        )

    }

    insertVenda(venda: Venda){
        let vendaBody = {
            'venda': {
                'dt_hr_venda': venda.dt_hr_venda,
                'forma_pagamento': venda.forma_pagamento
            },
            'items': venda.items_venda.map((elemento: ItemVenda) => {
                return {
                    'quantidade': elemento.quantidade,
                    'fk_produto': elemento.produto?.id,
                    'preco_unitario': elemento.preco_unitario,

                }
            })

        }
        return this.http.post(`http://localhost:3000/vendas`,vendaBody).pipe(
            map( HTTPResponseParser.buildListaVendas )
        )
    }

}