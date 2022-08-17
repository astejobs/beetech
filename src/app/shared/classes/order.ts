import { Basket } from "./Basket";
import { Address } from "./Address";
import { Product } from "./product";

export class Order {
  id:number;
  userId:number;
  products:Product[]=[];
  orderId:string;
  orderedDate:Date;
  deliveredDate:Date;
  address:Address;
  status:string;
  paymentMode:string;
  paymentStatus:string;
  paymentResponse:string;
  remarks:string;

}
