import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-modal-alterar-fornecedor',
  templateUrl: './modal-alterar-fornecedor.component.html',
  styleUrls: ['./modal-alterar-fornecedor.component.css'],
  providers: [FornecedorService]
})
export class ModalAlterarFornecedorComponent implements OnInit, OnDestroy {

  criterioFiltro: string = "razao_social";
  valorFiltro: string = "";
  todosFornecedores: any[] = [];
  fornecedoresAlterados: Subscription
  @Output() fecharModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fornecedorService: FornecedorService) {
    this.fornecedoresAlterados = this.fornecedorService.fornecedoresAlterados.subscribe(
      todosFornecedores => {
        this.todosFornecedores = todosFornecedores
      }
    )
   }

  ngOnInit(): void {
  }

  
  ngOnDestroy(): void {
    this.fornecedoresAlterados.unsubscribe()
  }

  cancelar(){
    this.fecharModal.emit(null);
  }

  selecionar(fornecedor: any){
    this.fecharModal.emit(fornecedor);
  }

}
