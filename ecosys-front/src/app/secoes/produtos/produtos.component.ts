import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  providers: [ProdutoService]
})
export class ProdutosComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}  

}
