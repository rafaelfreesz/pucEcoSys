import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private usuario: Subscription
  isLogado = false;
  modoAtivo = "administracao"
  tipoUsuario = "v"
  mostrarModalEditarConta: boolean = false;
  mostrarModalGerenciarUsuarios: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}
  
  
  ngOnInit(): void {
    this.usuario = this.authService.usuario.subscribe(
      usuario => {
        this.isLogado = !!usuario;
        if(usuario){
          this.tipoUsuario = usuario.categoria
        }
      }
    )    
  }

  ngOnDestroy(): void {
    this.usuario.unsubscribe();
  }

  trocarModo(modo:string){
    this.modoAtivo = modo
  }

  logout(){
    this.authService.logout();
  }

  abrirModalEditarConta(){
    this.mostrarModalEditarConta = true;
  }
  fecharModalEditarConta(){
    this.mostrarModalEditarConta = false;
  }

  abrirModalGerenciarUsuarios(){
    this.mostrarModalGerenciarUsuarios = true;
  }
  fecharModalGerenciarUsuarios(){
    this.mostrarModalGerenciarUsuarios = false;
  }

  getLogin(){
    return this.authService.usuarioLogado.login;
  }

}
