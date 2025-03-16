import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-modal-alterar-fornecedor',
  templateUrl: './modal-alterar-fornecedor.component.html',
  styleUrls: ['./modal-alterar-fornecedor.component.css']
})
export class ModalAlterarFornecedorComponent implements OnInit, OnDestroy {

  criterioFiltro: string = "razao_social";
  valorFiltro: string = "";
  todosFornecedores: any[] = [];
  listaFornecedoresAlterada: Subscription
  @Output() fecharModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fornecedorService: FornecedorService) {}
  
  ngOnInit(): void {
    this.todosFornecedores = this.fornecedorService.getTodosFornecedores()
    this.listaFornecedoresAlterada = this.fornecedorService.listaFornecedoresAlterada.subscribe(
      todosFornecedores => {
        this.todosFornecedores = todosFornecedores
      }
    )
  }

  
  ngOnDestroy(): void {
    this.listaFornecedoresAlterada.unsubscribe()
  }

  cancelar(){
    this.fecharModal.emit(null);
  }

  selecionar(fornecedor: any){
    this.fecharModal.emit(fornecedor);
  }

  isLoading(){
    return this.fornecedorService.isLoading;
  }

}
