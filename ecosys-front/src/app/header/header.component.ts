import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private usuario: Subscription
  isLogado = false;
  modoAtivo = "administracao"

  constructor(private authService: AuthService, private router: Router) {
    
  }
  
  
  ngOnInit(): void {
    this.usuario = this.authService.usuario.subscribe(
      usuario => {this.isLogado = !!usuario}
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

}
