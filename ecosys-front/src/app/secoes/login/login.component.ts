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

  constructor(private authService: AuthService, private router: Router) {
    this.conteudoFormulario = new FormGroup({
      'login': new FormControl(null, [Validators.required,Validators.minLength(4),Validators.maxLength(14)]),
      'senha': new FormControl(null, [Validators.required,Validators.minLength(4),Validators.maxLength(14)])
    })
  }

  login(){
    console.log(this.conteudoFormulario.value)
    // this.authService.login();
    // this.router.navigate(["/"])
  }
  esqueciSenha(){
    console.log("Esqueci a senha")
  }
  ngOnInit(): void {
  }

}
