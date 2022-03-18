import { Subscription } from 'rxjs';
import { Basket } from './../../shared/classes/Basket';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { AppUser } from 'src/app/shared/classes/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  basket: Basket = new Basket();
  cartTotal=1500;
  totalItems: number = 0;

  isHidden:boolean = true;
  isHiddenMega:boolean = true;
  showStores:boolean = true;
  showCart = false;
  sub1: Subscription;
  user: AppUser = new AppUser();
  isLoggedIn: boolean = false;
  isAdmin = false;
    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private cartService: CartService) { }

    ngOnInit(): void {
      this.sub1 = this.cartService.getProducts()
      .subscribe(basket => {
        if(basket != null) {
          this.basket = basket;
          if(this.basket.basketItems) {
            this.totalItems = 0;
            this.basket.basketItems.forEach(item => {
              this.totalItems += item.quantity;
            })
          }
        } else {
          this.totalItems = 0;
        }
      });

      this.checkUser();

    }

    checkUser() {
      const account = this.authenticationService.currentUserValue;
      const isLoggedIn = account?.token;
      if (isLoggedIn) {
        this.user = account.user;
        this.isLoggedIn = true;
        if(this.user.role=="admin") {
          this.isAdmin = true;
        }
      }
    }

    showCartonMouseOver() {
      //if(!this.clickHoverMenuTrigger.menuOpen) {
      //  this.clickHoverMenuTrigger.openMenu();
     // }
    }
    hideCartonMouseLeave() {
      //if(this.clickHoverMenuTrigger.menuOpen) {
      //  this.clickHoverMenuTrigger.closeMenu();
      //}
    }

    showCartOnHover() {
      this.trigger.openMenu();
   }

   togglePages() {
    this.isHidden = !this.isHidden;
  }

  toggleStores() {
    this.showStores = !this.showStores;
  }

  toggleMega() {
    //this.isHiddenMega = !this.isHiddenMega;
  }
logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
ngOnDestroy(): void {
    this.sub1.unsubscribe();
}
}
