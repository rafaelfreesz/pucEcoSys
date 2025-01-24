import { Injectable } from '@angular/core';
import { Venda } from '../models/venda.model';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  
  todasVendas: Venda[] = [];

  constructor() { }
}
