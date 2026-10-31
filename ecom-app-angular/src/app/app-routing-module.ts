import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Products} from './ui/products/products';
import {Customers} from './ui/customers/customers';
import {canActivateAuthRole} from './guards/auth-guard';
import {Forbidden} from './ui/forbidden/forbidden';

const routes: Routes = [
  { path: 'products', component: Products, canActivate: [canActivateAuthRole], data: { roles: ['ADMIN'] } },
  { path: 'customers', component: Customers, canActivate: [canActivateAuthRole], data: {roles: ['USER']} },
  { path: 'forbidden', component: Forbidden }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
