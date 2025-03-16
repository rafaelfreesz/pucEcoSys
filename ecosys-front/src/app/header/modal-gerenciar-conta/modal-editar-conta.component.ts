import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-modal-editar-conta',
  templateUrl: './modal-editar-conta.component.html',
  styleUrls: ['./modal-editar-conta.component.css']
})
export class ModalGerenciarContaComponent implements OnInit {

  @Output() fecharModalEditarConta: EventEmitter<boolean> = new EventEmitter<boolean>()
  conteudoFormulario: FormGroup | any
  isLoading: boolean = false;
  errosFormulario: string[] = []

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.setFormulario()
  }

  fechar(){
    this.fecharModalEditarConta.emit(true)
  }
  async salvar(){

    this.errosFormulario = [];
    if(this.conteudoFormulario.valid){
      this.isLoading = true;
  
      const valores_novos = {
        id: this.authService.usuarioLogado.id,
        login: this.conteudoFormulario.value.login,
        senha: this.conteudoFormulario.value.senha,
        categoria: this.conteudoFormulario.value.categoria
      }
      
      this.authService.salvarUsuario(valores_novos).then(
        () => {
          this.conteudoFormulario.patchValue({
            login: valores_novos.login,
            categoria: valores_novos.categoria
          })
      
          this.fecharModalEditarConta.emit()
          this.isLoading = false;        
        }
      ).catch(
        erro => {
          this.errosFormulario.push(erro);
          this.isLoading = false;
        }
      )

    }else{
      this.verificarErrosFormulario();
    }

  }

  setFormulario(){
    this.conteudoFormulario = new FormGroup({
          'login': new FormControl(this.authService.usuarioLogado.login, [Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
          'senha': new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
          'confirmacao-senha': new FormControl(null, [Validators.required, this.senhaConfere.bind(this)])
        })
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
    
  }

  senhaConfere(control: FormControl): {[s: string]: boolean}{
    if(this.conteudoFormulario){

      if(control.value !== this.conteudoFormulario.controls.senha.value){
        return {'senhaConfere': true}
      }
    }

    return null;
  }

}
