import { WebRequestService } from './web-request.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BasketItem } from './../classes/BasketItem';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { Basket } from './../classes/Basket';
import { Product } from '../classes/product';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 basketItem: BasketItem;
 basketItems: BasketItem[] = [];
 public cartCount;
 public basket: Basket = new Basket();
 public cart = new BehaviorSubject<any>([]);
 public isLoggedIn;

  constructor(private authService: AuthenticationService,
              private apiService: WebRequestService) {
    const account = authService.currentUserValue;
    const isLoggedIn = account?.token;
    if(isLoggedIn) {
      console.log("Üser Is Logged In");
      this.isLoggedIn = true;
    } else {
      console.log("Üser Is Not Logged In");
      this.isLoggedIn = false;
      if(JSON.parse(localStorage.getItem('basket'))==null) {
        this.setProducts(new Basket());
      } else {
        this.setProducts(JSON.parse(localStorage.getItem('basket')));
      }
    }
  }
  getProducts(){
    return this.cart.asObservable();
  }
  setProducts(basket: Basket) {
    this.basket = basket;
    if(this.basket.basketItems.length < 1){
      this.basket = new Basket();
    } else {
      this.cart.next(this.basket);
    }
  }
  addtoCart(product: Product) {
    let local_storage: Basket;
    let tempBasket = new Basket();
    let basketItem = new BasketItem();

    basketItem.product = product;
    basketItem.price = product.price;
    basketItem.quantity = 1;

    this.basketItems = [];
    this.basketItems.push(basketItem);

    if(JSON.parse(localStorage.getItem('basket')) == null){
      console.log("First Itemmmmmmmmmmm");
      local_storage = new Basket();
      tempBasket.basketItems = this.basketItems;
      localStorage.setItem('basket', JSON.stringify(tempBasket));
      console.log('Pushed first Item: ', basketItem);

    } else {
        console.log("Next Itemmmmmmmmmmm");
        local_storage = JSON.parse(localStorage.getItem('basket'));

        const exist = local_storage.basketItems.find((item) => {
          return product.id === item.product.id;
        });
        if(exist) {
          this.addQty(exist.product);
          return;
        } else {
          tempBasket.basketItems = local_storage.basketItems;
          tempBasket.basketItems.push(basketItem);
        }
        localStorage.setItem('basket', JSON.stringify(tempBasket));
    }
    this.basket = tempBasket;
    this.cart.next(this.basket);
    this.getTotalPrice();

    //IF User Is Logged IN Strore Cart In Database
    if(this.isLoggedIn) {
      console.log("Basket....",this.basket);
      this.storeCartInDB(this.basket);
    }
  }
  isPresent(item: BasketItem) {
    const exist = this.basket.basketItems.find((itm) => {
      return item.product.id === itm.product.id;
    });
    if(exist) {
      return true;
    } else {
      return false;
    }
  }

  synchroniseCart(basket: Basket) {
      if(basket?.basketItems) {
        basket.basketItems.forEach((itemDB, idx) => {
            if(this.isPresent(itemDB)) {
              this.basket.basketItems.find((itemLS, index) => {
                if(itemLS.product.id === itemDB.product.id) {
                  //itemDB.quantity = itemLS.quantity;
                  this.basket.basketItems[index]=itemDB;
                }
              })
            } else {
              this.basket?.basketItems.push(itemDB);
            }
        });
      }
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.cart.next(this.basket);
      if(this.isLoggedIn) {
        this.storeCartInDB(this.basket);
      }
   }

  storeCartInDB(basket: Basket) {
    return this.apiService.saveBasket(basket)
      .subscribe(basket => {
        this.setProducts(basket);
        console.log("Bassssss......",basket);
      })
  }

  getUserBasket(id: any) {
    return this.apiService.getBasket(id);
  }
  updateUserBasket(basket: Basket) {
    this.basket = basket;
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.cart.next(this.basket);
  }

  setCartUser(user: any) {
    this.basket.user = user;
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.cart.next(this.basket);
  }
  setCartAddress(address: any) {
    this.basket.address = address;
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.cart.next(this.basket);
  }

  getTotalPrice() {
    let grandTotal = 0;
    this.basket.basketItems.map((item: BasketItem)=> {
      grandTotal += (item.product.price*item.quantity);
    });
    return grandTotal;
  }

  removeCartItem(cartItem: BasketItem) {
    this.basket.basketItems.map((a:any, index:any)=> {
      if(cartItem.product.id==a.product.id){
        this.basket.basketItems.splice(index,1);
      }
    });
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.cart.next(this.basket);
    if(this.isLoggedIn)
      this.storeCartInDB(this.basket);
  }
  removeAllCart() {
    this.basket.basketItems = [];
    this.cart.next(this.basket);
  }

  addQty(product: Product) {
    let shopping_cart = new Basket();
    shopping_cart = JSON.parse(localStorage.getItem('basket'));
    for(let i in shopping_cart.basketItems){
      if(product.id == shopping_cart.basketItems[i].product.id){
        shopping_cart.basketItems[i].quantity +=1;
        break;
      }
    }
    localStorage.setItem('basket', JSON.stringify(shopping_cart));
    this.basket = shopping_cart;
    this.cart.next(this.basket);
    if(this.isLoggedIn)
      this.storeCartInDB(this.basket);
  }

  removeQty(product: Product) {
    let shopping_cart = new Basket();
    shopping_cart = JSON.parse(localStorage.getItem('basket'));
    for(let i in shopping_cart.basketItems){
      if(product.id == shopping_cart.basketItems[i].product.id){
        shopping_cart.basketItems[i].quantity -=1;
        break;
      }
    }
    localStorage.setItem('basket', JSON.stringify(shopping_cart));
    this.basket = shopping_cart;
    this.cart.next(this.basket);
    if(this.isLoggedIn)
      this.storeCartInDB(this.basket);
  }
  numberOfItems(){
    let basket:Basket = JSON.parse(localStorage.getItem('basket'));
    if(basket==null) {
      return 0;
    } else {
      this.cartCount = basket.basketItems.length;
    }
    this.cartCount;
  }
  clearCart(){
    localStorage.clear();
  }
}
