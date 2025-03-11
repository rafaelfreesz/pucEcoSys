import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { ProdutosComponent } from './secoes/produtos/produtos.component';
import { HomeComponent } from './home/home.component';
import { FornecedoresComponent } from './secoes/fornecedores/fornecedores.component';
import { EntradasComponent } from './secoes/entradas/entradas.component';
import { VendasComponent } from './secoes/vendas/vendas.component';
import { LoginComponent } from './secoes/login/login.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', canActivate:[AuthGuard], component: HomeComponent},
  {path:'vendas', canActivate:[AuthGuard], component: VendasComponent},
  {path:'produtos', canActivate:[AuthGuard], component: ProdutosComponent},
  {path:'fornecedores', canActivate:[AuthGuard], component: FornecedoresComponent},
  {path:'entradas', canActivate:[AuthGuard], component: EntradasComponent},
  {path:'not-found', canActivate:[AuthGuard], component: NotFoundComponent},
  {path:'**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
