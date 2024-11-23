import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss'],
  providers: [FornecedorService]
})
export class FornecedoresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
