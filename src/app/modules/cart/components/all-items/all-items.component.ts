import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartService } from './../../../../shared/services/cart.service';
import { Basket } from './../../../../shared/classes/Basket';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit, OnDestroy {
  basket: Basket= new Basket();
  totalItems: number = 0;
  grandTotal: number = 0;
  hasItems: boolean = false;
  subs: Subscription[]= [];

  constructor(private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.getBasket();
  }

  getBasket() {
    this.subs.push(this.cartService.getProducts()
    .subscribe(basket => {
      if(basket != null) {
        this.basket = basket;
        if(this.basket.basketItems) {
          this.totalItems = 0;
          this.grandTotal = 0;
          this.basket.basketItems.forEach(item => {
            this.totalItems += item.quantity;
            this.grandTotal += (item.product.price)*(item.quantity);
          });
          this.hasItems = true;
        }
      } else {
        this.totalItems = 0;
      }
    }));
  }

  onCheckOut() {
    console.log("Processing Checkout...");
    this.router.navigate(['/cart/checkout']);
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub => {
        sub.unsubscribe();
      })
  }

}
