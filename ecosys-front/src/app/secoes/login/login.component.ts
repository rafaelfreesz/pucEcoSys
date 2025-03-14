import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  conteudoFormulario: FormGroup | any;
  isLoading: boolean = false;
  erro: string = ""

  constructor(private authService: AuthService, private router: Router) {
    this.conteudoFormulario = new FormGroup({
      'login': new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
      'senha': new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(14)])
    })
  }

  login(){
    this.isLoading = true
    this.authService.login({
      login: this.conteudoFormulario.value.login,
      senha: this.conteudoFormulario.value.senha
    }).subscribe(
      (res) => {
        this.isLoading = false;
        this.erro = "";
        this.router.navigate(["/"])},
      (erro) => {
        this.erro = erro;
        this.isLoading = false;}
    );
  }
  esqueciSenha(){
    console.log("Esqueci a senha")
  }
  ngOnInit(): void {
  }

}
