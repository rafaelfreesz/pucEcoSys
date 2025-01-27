import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemVenda } from 'src/app/models/item_venda.model';
import { Venda } from 'src/app/models/venda.model';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-modal-venda',
  templateUrl: './modal-venda.component.html',
  styleUrls: ['./modal-venda.component.scss']
})
export class ModalVendaComponent implements OnInit {

  vendaNova: Venda | null = null
  vendaFoiCriada: Subscription;
  mostrarModalItem: boolean = false;
  constructor(private vendaService: VendaService) {
    this.vendaFoiCriada = vendaService.vendaFoiCriada.subscribe(
      () => {
        this.vendaNova = new Venda();
      }
    )
  }

  ngOnInit(): void {
  }

  fechar():void {
    this.vendaNova = null;
  }

  temItem(): boolean{
    return this.vendaNova?.items_venda.length !== 0;
  }

  //TODO implementar funções
  mostrarModalIncluirItem(){
    this.mostrarModalItem = true;
  }
  excluirItem(item: any){}
  fecharModalIncluirItem(item: ItemVenda){
    if(item){
      this.vendaNova?.items_venda.push(item)
    }
    this.mostrarModalItem = false;
  }

}
