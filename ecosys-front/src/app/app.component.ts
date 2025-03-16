import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ProdutoService } from './services/produto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecosys-front';

  constructor(private authService: AuthService){}
  
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
