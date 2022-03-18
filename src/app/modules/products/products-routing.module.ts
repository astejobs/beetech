import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent, pathMatch: 'prefix',
  children: [
      { path: '', component: AllProductsComponent},
      { path: ':id', component: ProductDetailComponent},

    ]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
