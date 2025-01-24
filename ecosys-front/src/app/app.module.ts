import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ProdutosComponent } from './secoes/produtos/produtos.component';
import { ProdutoService } from './services/produto.service';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ListaProdutosComponent } from './secoes/produtos/lista-produtos/lista-produtos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncurtarPipe } from './pipes/encurtar.pipe';
import { InsereZerosPipe } from './pipes/insere-zeros.pipe';
import { ModalProdutoComponent } from './secoes/produtos/modal-produto/modal-produto.component';
import { FiltroListaPipe } from './pipes/filtro-lista.pipe';
import { ContadorFiltroPipe } from './pipes/contador-filtro.pipe';
import { HomeComponent } from './home/home.component';
import { FornecedoresComponent } from './secoes/fornecedores/fornecedores.component';
import { ListaFornecedoresComponent } from './secoes/fornecedores/lista-fornecedores/lista-fornecedores.component';
import { ModalFornecedorComponent } from './secoes/fornecedores/modal-fornecedor/modal-fornecedor.component';
import { EnderecoCorridoPipe } from './pipes/endereco-corrido.pipe';
import { TelefoneCorridoPipe } from './pipes/telefone-corrido.pipe';
import { CnpjPipe } from './pipes/cnpj.pipe';
import { EscondeExcluidosPipe } from './pipes/esconde-excluidos.pipe';
import { EntradasComponent } from './secoes/entradas/entradas.component';
import { ListaEntradasComponent } from './secoes/entradas/lista-entradas/lista-entradas.component';
import { DataPipe } from './pipes/data.pipe';
import { ModalEntradaComponent } from './secoes/entradas/modal-entrada/modal-entrada.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalAlterarFornecedorComponent } from './secoes/entradas/modal-alterar-fornecedor/modal-alterar-fornecedor.component';
import { ModalIncluirProdutoComponent } from './secoes/entradas/modal-incluir-produto/modal-incluir-produto.component';
import { BalcaoComponent } from './secoes/balcao/balcao.component';
import { VendasComponent } from './secoes/vendas/vendas.component';
import { ListaVendasComponent } from './secoes/vendas/lista-vendas/lista-vendas.component';
import { TraduzFormaPagamentoPipe } from './pipes/traduz-forma-pagamento.pipe';

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
    CnpjPipe,
    EntradasComponent,
    ListaEntradasComponent,
    DataPipe,
    EscondeExcluidosPipe,
    ModalEntradaComponent,
    ModalAlterarFornecedorComponent,
    ModalIncluirProdutoComponent,
    BalcaoComponent,
    VendasComponent,
    ListaVendasComponent,
    TraduzFormaPagamentoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
