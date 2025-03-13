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

  isAutenticado():Promise<boolean> {
    
    const promise = new Promise<boolean>(
      (resolve, reject) => {() => {resolve(this.loggedIn)}}
    )

    return promise;
  }

  login(data: any){
    return this.httpCliente.post<any>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwXFCCL9yibFpDMUf16u-h6hPWA25gFZo`,
        { email:	data.email,
          password:	data.password,
          returnSecureToken: true
        }
      ).pipe(catchError(
          (erro) => {
            return throwError(erro.error.error.message)
          }
        ),
        tap( resp => { this.trataLogin(resp) })
      )
      // this.loggedIn = true;
  }

  logout(){
    this.loggedIn = false;
  }

  trataLogin(resp: any){
    const dt_hr_expira_token = new Date(new Date().getTime() + resp.expiresIn*1000)
    const usuario = new Usuario(resp.email,  resp.localId,  resp.idToken,  dt_hr_expira_token)
    this.usuario.next(usuario);
  }
}
