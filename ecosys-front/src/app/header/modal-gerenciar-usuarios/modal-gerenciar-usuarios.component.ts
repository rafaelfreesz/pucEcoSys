import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-gerenciar-usuarios',
  templateUrl: './modal-gerenciar-usuarios.component.html',
  styleUrls: ['./modal-gerenciar-usuarios.component.css']
})
export class ModalGerenciarUsuariosComponent implements OnInit {
  
  @Output() fecharModalGerenciarUsuarios: EventEmitter<boolean> = new EventEmitter<boolean>()
  usuarios: Usuario[] = [];
  todosUsuariosAlterado: Subscription;
  usuarioSelecionado: Usuario = null;
  conteudoFormulario: FormGroup | any
  
  constructor(private authService: AuthService) {

    // for(let i=0; i<10;i++){
    //   this.usuarios.push(new Usuario('aaa',i,'g','1',new Date()))
    // }
    // this.usuarioSelecionado = this.usuarios[0]  //TODO remover
    this.setFormulario();
  }

  ngOnInit(): void {
    this.todosUsuariosAlterado = this.authService.todosUsuarios.subscribe(
      todosUsuarios => {
        this.usuarios = todosUsuarios
      }
    )
    this.authService.getTodosUsuarios()
  }

  selecionarUsuario(usuario: Usuario){
    if(usuario == this.usuarioSelecionado){
      this.usuarioSelecionado = null;
    }else{
      this.usuarioSelecionado = usuario;
      this.setFormulario();
    }
  }

  prepararCadastro(){
    this.usuarioSelecionado = new Usuario("",-1,"v","",new Date);
    this.setFormulario();
  }

  fechar(){
    this.usuarioSelecionado = null
    this.fecharModalGerenciarUsuarios.emit(true)
  }

  salvar(){
    
    if(this.usuarioSelecionado){
      const formulario = this.getFormulario();
      this.authService.salvarUsuario(this.usuarioSelecionado.id !== -1? {...formulario, id:this.usuarioSelecionado.id}: formulario)
      this.usuarioSelecionado = null;
      this.setFormulario()
    }

  }

  setFormulario(){
    if(this.usuarioSelecionado){

      this.conteudoFormulario = new FormGroup({
                'login': new FormControl(this.usuarioSelecionado.login, [Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
                'senha': new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
                'categoria': new FormControl(this.usuarioSelecionado.categoria, [Validators.required,]),
                'confirmacao-senha': new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(14)])
              })

    }else{

      this.conteudoFormulario = new FormGroup({
                'login': new FormControl([Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
                'senha': new FormControl([Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
                'categoria': new FormControl([Validators.required,]),
                'confirmacao-senha': new FormControl([Validators.required,Validators.minLength(2),Validators.maxLength(14)])
              })
    }
  }

  getFormulario(){
    return {
      login: this.conteudoFormulario.value.login,
      senha: this.conteudoFormulario.value.senha,
      categoria: this.conteudoFormulario.value.categoria
    }
  }


}
