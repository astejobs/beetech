import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { AllItemsComponent } from './components/all-items/all-items.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './cart.component';

const routes: Routes = [
  { path: '', component: CartComponent, pathMatch: 'prefix',
  children: [
      { path: '', component: AllItemsComponent},
      { path: ':checkout', component: CheckoutComponent},
      /* children: [
          { path: '', component: CartItemComponent},

        ]}, */

    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
