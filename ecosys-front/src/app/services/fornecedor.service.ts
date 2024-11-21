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
    fornecedorFoiSeleciontado: Subject<Fornecedor | null> = new Subject<Fornecedor | null>();

    
    constructor(private httpService: HttpService){
        this.buscarTodosFornecedores();
    }
    
    buscarTodosFornecedores(): void{
        this.httpService.getTodosFornecedores().subscribe( todosFornecedores => {
            this.todosFornecedores = todosFornecedores
            this.fornecedoresAlterados.next(this.todosFornecedores.slice());
        })
    }
    
    temFornecedorSelecionado(): boolean {
        return this.fornecedorSelecionado !== null
    }

    selecionarFornecedor(fornecedor: Fornecedor){
        this.fornecedorSelecionado = fornecedor;
        this.fornecedorFoiSeleciontado.next(this.fornecedorSelecionado)
    }

    liberarFornecedorSelecionado(comando: string){
        this.fornecedorSelecionado = null;
        this.fornecedorFoiSeleciontado.next(null)
        
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