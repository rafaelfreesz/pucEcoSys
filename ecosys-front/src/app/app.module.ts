import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ProdutosComponent } from './secoes/produtos/produtos.component';
import { HttpService } from './services/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { VendasComponent } from './secoes/vendas/vendas.component';
import { ListaVendasComponent } from './secoes/vendas/lista-vendas/lista-vendas.component';
import { TraduzFormaPagamentoPipe } from './pipes/traduz-forma-pagamento.pipe';
import { ModalVendaComponent } from './secoes/vendas/modal-venda/modal-venda.component';
import { NotificacoesComponent } from './home/notificacoes/notificacoes.component';
import { ResumoDoDiaComponent } from './home/resumo-do-dia/resumo-do-dia.component';
import { PaginatorPipe } from './pipes/paginator.pipe';
import { GraficoComponent } from './home/grafico/grafico.component';
import { LoginComponent } from './secoes/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ModalGerenciarContaComponent } from './header/modal-gerenciar-conta/modal-editar-conta.component';
import { ModalGerenciarUsuariosComponent } from './header/modal-gerenciar-usuarios/modal-gerenciar-usuarios.component';
import { CategoriaPipe } from './pipes/categoria.pipe';
import { registerLocaleData } from '@angular/common';
import { ProdutoService } from './services/produto.service';
import { FornecedorService } from './services/fornecedor.service';
import localePt from '@angular/common/locales/pt'

registerLocaleData(localePt, 'pt-BR')

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
    VendasComponent,
    ListaVendasComponent,
    TraduzFormaPagamentoPipe,
    ModalVendaComponent,
    NotificacoesComponent,
    ResumoDoDiaComponent,
    PaginatorPipe,
    GraficoComponent,
    LoginComponent,
    ModalGerenciarContaComponent,
    ModalGerenciarUsuariosComponent,
    CategoriaPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [HttpService, AuthService, AuthGuard, ProdutoService, FornecedorService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}, {provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
