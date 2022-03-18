import { UnitComponent } from './components/unit/unit.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CategoryComponent } from './components/category/category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoComponent } from './components/demo/demo.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', component: AdminComponent, pathMatch: 'prefix',
    children: [
        { path: '', component: DashboardComponent},
        { path: 'products', component: ProductsComponent },
        { path: 'add-product', component: AddProductComponent },
        { path: 'edit-product/:id', component: EditProductComponent},
        { path: 'category', component: CategoryComponent },
        { path: 'category/:id', component: CategoryComponent },
        { path: 'unit', component: UnitComponent },
        { path: 'unit/:id', component: UnitComponent },
        { path: 'demo', component: DemoComponent },
        { path: 'orders', loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule) }

      ]},
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
