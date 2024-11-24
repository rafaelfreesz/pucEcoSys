import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { HomeComponent } from './home/home.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { EntradasComponent } from './secoes/entradas/entradas.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
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
