import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-modal-gerenciar-conta',
  templateUrl: './modal-gerenciar-conta.component.html',
  styleUrls: ['./modal-gerenciar-conta.component.css']
})
export class ModalGerenciarContaComponent implements OnInit {

  mostrarModal:boolean = true;
  usuario: Usuario = null;
  conteudoFormulario: FormGroup | any

  constructor() {
    this.conteudoFormulario = new FormGroup({
          'login': new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
          'categoria': new FormControl(null, [Validators.required,]),
          'senha': new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(14)])
        })
  }

  ngOnInit(): void {
  }

  fechar(){
    
  }
  salvar(){
    
  }

}
