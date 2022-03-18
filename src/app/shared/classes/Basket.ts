import { AppUser } from './app-user';
import { BasketItem } from "./BasketItem";
import { Address } from "./Address";

export class Basket {
  id:number;
  basketItems:BasketItem[] = [];
  user: AppUser;
  totalPrice:number;
  address: Address;
}
