import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.setFormulario()
  }

  fechar(){
    this.fecharModalEditarConta.emit(true)
  }
  async salvar(){
    this.isLoading = true;

    const valores_novos = {
      id: this.authService.usuarioLogado.id,
      login: this.conteudoFormulario.value.login,
      senha: this.conteudoFormulario.value.senha,
      categoria: this.conteudoFormulario.value.categoria
    }

    await this.authService.salvarUsuario(valores_novos)

    this.conteudoFormulario.patchValue({
      login: valores_novos.login,
      categoria: valores_novos.categoria
    })

    this.isLoading = false;
    this.fecharModalEditarConta.emit()

  }

  setFormulario(){
    this.conteudoFormulario = new FormGroup({
          'login': new FormControl(this.authService.usuarioLogado.login, [Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
          'senha': new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(14)]),
          'categoria': new FormControl(this.authService.usuarioLogado.categoria, [Validators.required,]),
          'confirmacao-senha': new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(14)])
        })
  }

}
