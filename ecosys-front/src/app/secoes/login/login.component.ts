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
      'login': new FormControl(null, [Validators.required,Validators.minLength(4),Validators.maxLength(14)]),
      'senha': new FormControl(null, [Validators.required,Validators.minLength(4),Validators.maxLength(14)])
    })
  }

  login(){
    this.isLoading = true
    this.authService.login({
      email: this.conteudoFormulario.value.login,
      password: this.conteudoFormulario.value.senha
    }).subscribe(
      (res) => {console.log('res'); console.log(res); this.isLoading = false; this.erro = ""},
      (err) => {console.log('err'); console.log(err); this.isLoading = false; this.erro = err.error.error.message}
    );
    // this.router.navigate(["/"])
  }
  esqueciSenha(){
    console.log("Esqueci a senha")
  }
  ngOnInit(): void {
  }

}
