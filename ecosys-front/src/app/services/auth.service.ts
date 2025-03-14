import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Usuario } from "../models/usuario.model";

@Injectable()
export class AuthService {

  usuario: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(null);  
  loggedIn: boolean = false;
  
  constructor(private httpCliente: HttpClient) { }
  

  login(data: any){
    return this.httpCliente.post<any>(
        `http://localhost:3000/conta/login`,
        {
          login:	data.login,
          senha:	data.senha
        }
      ).pipe(catchError(
          (erro) => {
            return throwError(erro.error.mensagem)
          }
        ),
        tap( resp => { this.trataLogin(resp) })
      )
  }

  logout(){
    this.loggedIn = false;
  }

  trataLogin(resp: any){
    const dt_hr_expira_token = new Date(new Date().getTime() + resp.expira_em)
    const usuario = new Usuario(resp.login,  resp.id,  resp.token,  dt_hr_expira_token)
    this.usuario.next(usuario);
  }
}
