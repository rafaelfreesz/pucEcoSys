import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProdutosComponent } from './produtos/produtos.component';

const routes: Routes = [
  {path:'', component: ProdutosComponent},
  // {path:'', component: NotFoundComponent},
  // {path:'produtos', component: ProdutosComponent},
  // {path:'fornecedores', component: FornecedoresComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
