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
  errosFormulario: string[] = []
  isLoading: boolean = true
  
  constructor(private authService: AuthService) {

    this.setFormulario();
  }

  ngOnInit(): void {
    this.todosUsuariosAlterado = this.authService.todosUsuarios.subscribe(
      todosUsuarios => {
        this.usuarios = todosUsuarios.filter(usuario => {return usuario.id !== this.authService.usuarioLogado.id})
        this.isLoading = false;
      }
    )
    this.authService.getTodosUsuarios()
  }

  selecionarUsuario(usuario: Usuario){
    this.errosFormulario = []
    if(usuario == this.usuarioSelecionado){
      this.usuarioSelecionado = null;
    }else{
      this.usuarioSelecionado = usuario;
      this.setFormulario();
    }
  }

  prepararCadastro(){
    this.errosFormulario = []
    this.usuarioSelecionado = new Usuario("",-1,"v","",new Date());
    this.setFormulario();
  }

  fechar(){
    this.usuarioSelecionado = null
    this.fecharModalGerenciarUsuarios.emit(true)
  }

  salvar(){

    this.errosFormulario = [];
    if(this.conteudoFormulario.valid){
      this.isLoading = true;
      
      if(this.usuarioSelecionado){
        const formulario = this.getFormulario();
        this.authService.salvarUsuario(this.usuarioSelecionado.id !== -1? {...formulario, id:this.usuarioSelecionado.id}: formulario).then(
          () =>{
            this.usuarioSelecionado = null;
            this.authService.getTodosUsuarios();            
          }
        ).catch(
          (erro) => {
            this.errosFormulario.push(erro)
            this.isLoading = false;
          }
        )
      }
    }else{
      this.verificarErrosFormulario();
    }
    

  }

  setFormulario(){
    if(this.usuarioSelecionado){

      if(this.usuarioSelecionado.id == -1){
        console.log('oi')
        this.conteudoFormulario = new FormGroup({
          'login': new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
          'senha': new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
          'categoria': new FormControl(null,[Validators.required]),
          'confirmacao-senha': new FormControl(null,[Validators.required, this.senhaConfere.bind(this)])
        })
      }else{
        
        this.conteudoFormulario = new FormGroup({
            'login': new FormControl(this.usuarioSelecionado.login, [Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
            'senha': new FormControl(null),
            'categoria': new FormControl(this.usuarioSelecionado.categoria, [Validators.required,]),
            'confirmacao-senha': new FormControl(null)
          })
      }
      
    }
  }

  getFormulario(){
    return {
      login: this.conteudoFormulario.value.login,
      senha: this.conteudoFormulario.value.senha,
      categoria: this.conteudoFormulario.value.categoria
    }
  }

  verificarErrosFormulario(){

    if(!this.conteudoFormulario.controls.login.valid){
        const errors = this.conteudoFormulario.controls.login.errors;
        if (errors["required"]){
          this.errosFormulario.push("O login deve ser informado.")
        }
        if (errors["minlength"]){
          this.errosFormulario.push("O login deve ter entre 4 e 14 caracteres.")
        }
      }
      
      if(!this.conteudoFormulario.controls.senha.valid){
        const errors = this.conteudoFormulario.controls.senha.errors;
        if (errors["required"]){
          this.errosFormulario.push("A senha deve ser informada.")
        }
        if (errors["minlength"]){
          this.errosFormulario.push("A senha deve ter entre 4 e 14 caracteres.")
        }
      }

      if(!this.conteudoFormulario.controls['confirmacao-senha'].valid){
        const errors = this.conteudoFormulario.controls['confirmacao-senha'].errors;
        if (errors["required"]){
          this.errosFormulario.push("A confirmação da senha deve ser informada.")
        }
        if (errors["senhaConfere"]){
          this.errosFormulario.push("As senhas não conferem.")
        }
      }

      if(!this.conteudoFormulario.controls['categoria'].valid){
        const errors = this.conteudoFormulario.controls['categoria'].errors;
        if (errors["required"]){
          this.errosFormulario.push("A categoria deve ser informada.")
        }
      }
    
  }

  senhaConfere(control: FormControl): {[s: string]: boolean}{
    if(this.conteudoFormulario){

      if(control.value !== this.conteudoFormulario.controls.senha.value){
        return {'senhaConfere': true}
      }
    }

    return null;
  }

  usuarioEhOLogado(usuario: Usuario): boolean{
    return usuario.id === this.authService.usuarioLogado.id
  }
}
