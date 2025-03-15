import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, exhaustMap, map, take, tap } from "rxjs/operators";
import { Usuario } from "../models/usuario.model";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

  usuario: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(null);
  usuarioLogado: Usuario;
  todosUsuarios: Subject<Usuario[]> = new Subject<Usuario[]>()
  private timerToken: any;
  
  constructor(private httpCliente: HttpClient, private router: Router) { }
  

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
      this.usuarioLogado = usuario

      const tempoLogout = new Date(usuarioStorage._dt_hr_expira_token).getTime() - new Date().getTime();
      this.autoLogout(tempoLogout)
    }

  }

  logout(){

    this.usuarioLogado = null;
    this.usuario.next(null);
    localStorage.removeItem('usuario')
    this.router.navigate(['/login'])

    if(this.timerToken) { 
      clearTimeout(this.timerToken)
    }
    this.timerToken = null;

  }

  salvarUsuario(usuario: any){
    if(usuario.id){

      this.httpCliente.put(`http://localhost:3000/conta/editar/${usuario.id}`,usuario).subscribe(
        (valores_novos: any) => {
          this.usuarioLogado.login = valores_novos.login;
          this.usuarioLogado.categoria = valores_novos.categoria;
          this.usuario.next(this.usuarioLogado)
        }  
      )
      
    }else{

      this.httpCliente.post(`http://localhost:3000/conta/cadastrar`,usuario).subscribe(
        (valores_novos: any) => {
          this.usuarioLogado.login = valores_novos.login;
          this.usuarioLogado.categoria = valores_novos.categoria;
          this.usuario.next(this.usuarioLogado)
        }  
      )

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
    this.usuarioLogado = usuario;
    this.usuario.next(usuario);
    this.autoLogout(resp.expira_em*1000)
    localStorage.setItem('usuario',JSON.stringify(usuario))
  }
}
