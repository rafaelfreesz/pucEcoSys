import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoService } from './services/produto.service';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ListaProdutosComponent } from './produtos/lista-produtos/lista-produtos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncurtarPipe } from './pipes/encurtar.pipe';
import { InsereZerosPipe } from './pipes/insere-zeros.pipe';
import { ModalProdutoComponent } from './produtos/modal-produto/modal-produto.component';
import { FiltroProdutoPipe } from './pipes/filtro-produto.pipe';
import { ContadorFiltroProdutoPipe } from './pipes/contador-filtro-produto.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    ProdutosComponent,
    ListaProdutosComponent,
    EncurtarPipe,
    InsereZerosPipe,
    ModalProdutoComponent,
    FiltroProdutoPipe,
    ContadorFiltroProdutoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProdutoService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
