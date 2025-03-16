import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, exhaustMap, map, take, tap } from "rxjs/operators";
import { Usuario } from "../models/usuario.model";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

  usuario: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(null);
  private _usuarioLogado: Usuario;
  todosUsuarios: Subject<Usuario[]> = new Subject<Usuario[]>()
  private timerToken: any;
  
  constructor(private httpCliente: HttpClient, private router: Router) { }
  
  get usuarioLogado(){
    return new Usuario(this._usuarioLogado.login, this._usuarioLogado.id,this._usuarioLogado.categoria,this._usuarioLogado.token,this._usuarioLogado.dt_hr_expira_token);
  }

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

  autoLogin(){
    const usuarioStorage = JSON.parse(localStorage.getItem('usuario'));

    if(!usuarioStorage){
      return;
    }

    const usuario = new Usuario(usuarioStorage.login, usuarioStorage.id, usuarioStorage._categoria, usuarioStorage._token, new Date(usuarioStorage._dt_hr_expira_token));
   
    if(usuario.token){
      this.usuario.next(usuario);
      this._usuarioLogado = usuario

      const tempoLogout = new Date(usuarioStorage._dt_hr_expira_token).getTime() - new Date().getTime();
      this.autoLogout(tempoLogout)
    }

  }

  logout(){

    this._usuarioLogado = null;
    this.usuario.next(null);
    localStorage.removeItem('usuario')
    this.router.navigate(['/login'])

    if(this.timerToken) { 
      clearTimeout(this.timerToken)
    }
    this.timerToken = null;

  }

  salvarUsuario(usuario: any): Promise<string>{
    if(usuario.id){

      return new Promise((resolve,reject) => {

        this.httpCliente.put(`http://localhost:3000/conta/editar/${usuario.id}`,usuario).subscribe(
          (valores_novos: any) => {
            this._usuarioLogado.login = valores_novos.login;
            this._usuarioLogado.categoria = valores_novos.categoria;
            this.getTodosUsuarios()
            this.usuario.next(this._usuarioLogado)
            resolve("ok")
          },
          (erro) => {
            reject(erro.error)
          }  
        )

      })

      
    }else{

      return new Promise( (resolve,reject) => {

        this.httpCliente.post(`http://localhost:3000/conta/cadastrar`,usuario).subscribe(
          () => {
            this.getTodosUsuarios()
            resolve("ok")
          },
          (erro) => {
            reject(erro.error)
          }  
        )
      })


    }
    
  }

  getTodosUsuarios() {
    
    this.httpCliente.get(`http://localhost:3000/conta/usuarios`).pipe(
      map(
        (retorno: any[]) => {
          const usuarios: Usuario[] = []
          
          
          retorno.forEach(
            item => {
              const usuario = new Usuario(item.login, item.id, item.categoria,"",new Date())
              usuarios.push(usuario)
            }
          )
          return usuarios
        }
      ),
    ).subscribe(
      usuarios_prontos => {
        this.todosUsuarios.next(usuarios_prontos);
      }
    )
  }

  autoLogout(tempoLogout){
    this.timerToken = setTimeout(() => {
      this.logout()
    }, tempoLogout)
  }

  trataLogin(resp: any){
    const dt_hr_expira_token = new Date(new Date().getTime() + resp.expira_em*1000)
    const usuario = new Usuario(resp.login,  resp.id,  resp.categoria,  resp.token,  dt_hr_expira_token)
    this._usuarioLogado = usuario;
    this.usuario.next(usuario);
    this.autoLogout(resp.expira_em*1000)
    localStorage.setItem('usuario',JSON.stringify(usuario))
  }
}
