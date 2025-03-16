import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemVenda } from 'src/app/models/item_venda.model';
import { Venda } from 'src/app/models/venda.model';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-modal-venda',
  templateUrl: './modal-venda.component.html',
  styleUrls: ['./modal-venda.component.scss']
})
export class ModalVendaComponent implements OnInit, OnDestroy {

  vendaNova: Venda | null = null
  vendaFoiCriada: Subscription;
  vendaFoiFinalizada: Subscription;
  mostrarModalItem: boolean = false;
  isLoading: boolean = false;

  constructor(private vendaService: VendaService) {
    this.vendaFoiCriada = vendaService.vendaFoiCriada.subscribe(
      () => {
        this.vendaNova = new Venda();
      }
    )
    this.vendaFoiFinalizada = vendaService.vendaFoiFinalizada.subscribe(
      () => {
        this.vendaNova = null;
        this.isLoading = false;
      }
    )
  }
  
  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.vendaFoiCriada.unsubscribe();
    this.vendaFoiFinalizada.unsubscribe();
  }

  fechar():void {
    this.vendaNova = null;
  }

  temItem(): boolean{
    return this.vendaNova?.items_venda.length !== 0;
  }

  mostrarModalIncluirItem(){
    this.mostrarModalItem = true;
  }

  excluirItem(item: ItemVenda){
    if(this.vendaNova){
      this.vendaNova.items_venda = this.vendaNova.items_venda.filter(
        elemento => elemento != item 
      )
    }
  }

  fecharModalIncluirItem(item: ItemVenda){
    if(item){
      this.vendaNova?.items_venda.push(item)
    }
    this.mostrarModalItem = false;
  }

  submeterVenda(){
    this.isLoading = true;
    if(this.vendaNova){
      this.vendaNova.dt_hr_venda = new Date().toISOString();
      this.vendaService.salvarVenda(this.vendaNova);
    }
  }

}
