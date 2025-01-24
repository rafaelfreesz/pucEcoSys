import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { ProdutosComponent } from './secoes/produtos/produtos.component';
import { HomeComponent } from './home/home.component';
import { FornecedoresComponent } from './secoes/fornecedores/fornecedores.component';
import { EntradasComponent } from './secoes/entradas/entradas.component';
import { BalcaoComponent } from './secoes/balcao/balcao.component';
import { VendasComponent } from './secoes/vendas/vendas.component';

const routes: Routes = [
  {path:'', component: VendasComponent},
  {path:'vendas', component: VendasComponent},
  {path:'produtos', component: ProdutosComponent},
  {path:'fornecedores', component: FornecedoresComponent},
  {path:'entradas', component: EntradasComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
