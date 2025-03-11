import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  
  modoAtivo = "administracao"

  ngOnInit(): void {
  }

  trocarModo(modo:string){
    this.modoAtivo = modo
  }

  loggedIn(){
    return this.authService.loggedIn
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])

  }

}
