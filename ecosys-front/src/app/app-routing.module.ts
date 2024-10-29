import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { HomeComponent } from './home/home.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';

const routes: Routes = [
  {path:'', component: FornecedoresComponent},
  {path:'produtos', component: ProdutosComponent},
  {path:'fornecedores', component: FornecedoresComponent},
  // {path:'', component: NotFoundComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
