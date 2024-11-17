import { Injectable } from "@angular/core";
import { Fornecedor } from "../models/fornecedor.model";
import { Observable, Subject } from "rxjs";
import { HttpService } from "./http.service";

@Injectable()
export class FornecedorService{
    
    fornecedoresAlterados: Subject<Fornecedor[]> = new Subject<Fornecedor[]>()
    private todosFornecedores: Fornecedor[] = []

    constructor(private httpService: HttpService){
        this.buscarTodosFornecedores();
    }
    

    buscarTodosFornecedores(): void{
        this.httpService.getTodosFornecedores().subscribe( todosFornecedores => {
            this.todosFornecedores = todosFornecedores
            this.fornecedoresAlterados.next(this.todosFornecedores.slice());
        })
    }

    excluirContato(idContato: number):void{
        this.httpService.deleteContato(idContato).subscribe()
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