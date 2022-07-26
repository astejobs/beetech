import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoyoutComponent } from './layout/loyout.component';
import { BlogComponent } from './blog/blog.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

const routes: Routes = [
  { path: '', component: LoyoutComponent, pathMatch: 'prefix',

    children: [
        { path: '', component: HomeComponent},
        { path: 'products', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule) },
        { path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule) },
        { path: 'blog', component:BlogComponent},
        { path: 'myorders', component:MyOrdersComponent},

      ]},
  { path: "login", component:LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
