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
import { FiltroListaPipe } from './pipes/filtro-lista.pipe';
import { ContadorFiltroPipe } from './pipes/contador-filtro.pipe';
import { HomeComponent } from './home/home.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { ListaFornecedoresComponent } from './fornecedores/lista-fornecedores/lista-fornecedores.component';
import { FornecedorService } from './services/fornecedor.service';
import { ModalFornecedorComponent } from './fornecedores/modal-fornecedor/modal-fornecedor.component';
import { EnderecoCorridoPipe } from './pipes/endereco-corrido.pipe';
import { TelefoneCorridoPipe } from './pipes/telefone-corrido.pipe';
import { CnpjPipe } from './pipes/cnpj.pipe';

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
    FiltroListaPipe,
    ContadorFiltroPipe,
    HomeComponent,
    FornecedoresComponent,
    ListaFornecedoresComponent,
    ModalFornecedorComponent,
    EnderecoCorridoPipe,
    TelefoneCorridoPipe,
    CnpjPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
