import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpService{

    constructor(private http: HttpClient){}

    getTodosProdutos() {

        return this.http.get<any>('http://localhost:3000/produtos')

    }

}