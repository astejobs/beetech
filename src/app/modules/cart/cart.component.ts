import { BasketItem } from './../../shared/classes/BasketItem';
import { Basket } from './../../shared/classes/Basket';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  basket: Basket = new Basket();
  basketItems: BasketItem[] = [];

  constructor(private authService: AuthenticationService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.getUserBasket();
  }
 getUserBasket() {
   const account = this.authService.currentUserValue;
   const loggedIn = account?.token;
   if(loggedIn) {
     this.cartService.getUserBasket(account?.user?.id)
     .subscribe(res => {
       if(res==null) {
         console.log("Cart Empty");
       } else {
         this.basket = res;
         if(this.basket?.basketItems?.length>0) {
           console.log("Cart Has Items");
           this.cartService.synchroniseCart(this.basket);
         } else {
           console.log("No Items");
         }
       }
     },
     error => {
       console.log(error);
     });
   }
 }

}
