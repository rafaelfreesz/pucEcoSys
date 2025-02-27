import { Injectable } from "@angular/core";
import { Fornecedor } from "../models/fornecedor.model";
import { Subject } from "rxjs";
import { HttpService } from "./http.service";
import { Contato } from "../models/contato.model";

@Injectable()
export class FornecedorService{
    
    fornecedoresAlterados: Subject<Fornecedor[]> = new Subject<Fornecedor[]>()
    private todosFornecedores: Fornecedor[] = []

    private fornecedorSelecionado: Fornecedor | null = null;
    fornecedorFoiSelecionado: Subject<Fornecedor | null> = new Subject<Fornecedor | null>();

    
    constructor(private httpService: HttpService){
        this.buscarTodosFornecedores();
    }
    
    buscarTodosFornecedores(): void{
        this.httpService.getTodosFornecedores().subscribe( todosFornecedores => {
            this.todosFornecedores = todosFornecedores
            this.fornecedoresAlterados.next(this.todosFornecedores.slice());
            // this.selecionarFornecedor(this.todosFornecedores[0])
        })
    }

    salvarFornecedor(fornecedor: Fornecedor){
        //TODO tratar a inserção de traço no cep com diretivas, e corrigir no dump SQL
        if(fornecedor.id === -1){  //cadastro
            this.httpService.insertFornecedor(fornecedor).subscribe(
                () => {
                    this.buscarTodosFornecedores()
                    this.fornecedorSelecionado = null;
                    this.fornecedorFoiSelecionado.next(this.fornecedorSelecionado)
                }
            )
        }else{ //alteração
            this.httpService.updateFornecedor(fornecedor).subscribe(
                () => {
                    this.buscarTodosFornecedores()
                    this.fornecedorSelecionado = null;
                    this.fornecedorFoiSelecionado.next(this.fornecedorSelecionado)
                }
            )

        }
    }

    excluirFornecedor(){
        if(this.fornecedorSelecionado){
            this.httpService.deleteFornecedor(this.fornecedorSelecionado.id).subscribe(
                () => {
                    this.buscarTodosFornecedores()
                    this.fornecedorSelecionado = null;
                    this.fornecedorFoiSelecionado.next(this.fornecedorSelecionado)
                }
            )
            
        }
    }
    
    temFornecedorSelecionado(): boolean {
        return this.fornecedorSelecionado !== null
    }

    selecionarFornecedor(fornecedor: Fornecedor){
        this.fornecedorSelecionado = fornecedor;
        this.fornecedorFoiSelecionado.next(this.fornecedorSelecionado)
    }

    liberarFornecedorSelecionado(in_alteracao: boolean){
        this.fornecedorSelecionado = null;
        this.fornecedorFoiSelecionado.next(null)
        if(in_alteracao){
            this.buscarTodosFornecedores();
        }
        
    }

    excluirContato(idContato: number): Promise<any>{
        return new Promise((resolve) => {
            
            this.httpService.deleteContato(idContato).subscribe(
                (resp) => {resolve(resp)}
            )
        })
    }

    salvarContato(contato: Contato, idFornecedor: number): Promise<any>{
        return new Promise((resolve) => {
            this.httpService.salvarContato(contato,idFornecedor).subscribe(
                (ret) => {resolve(ret)}
            );

        })
    }

    // deletarFornecedor(id: number): void{
    //     this.httpService.deleteFornecedor(id).subscribe( todosFornecedores => {
    //         this.todosFornecedores = todosFornecedores
    //         this.fornecedoresAlterados.next(this.todosFornecedores.slice());
    //     })
    // }

    // salvarFornecedor(fornecedor: Fornecedor): void{
    //     if(fornecedor.id && fornecedor.id !== -1){
    //         this.httpService.updateFornecedor(fornecedor).subscribe( todosFornecedores => {
    //             this.todosFornecedores = todosFornecedores
    //             this.fornecedoresAlterados.next(this.todosFornecedores.slice());
    //         });
    //     }else{
    //         this.httpService.insertFornecedor(fornecedor).subscribe( todosFornecedores => {
    //             this.todosFornecedores = todosFornecedores
    //             this.fornecedoresAlterados.next(this.todosFornecedores.slice());
    //         });
    //     }
    // }
}