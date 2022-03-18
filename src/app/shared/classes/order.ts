import { Basket } from "./Basket";
import { Address } from "./Address";

export class Order {
  id:number;
  basket:Basket;
  orderId:string;
  orderDate:Date;
  deliveredDate:Date;
  address:Address;
  status:string;
  paymentMode:string;
  paymentStatus:string;
  paymentResponse:string;
  remarks:string;
}
