import { Basket } from "./Basket";
import { Address } from "./Address";
import { Product } from "./product";
import { OdrProduct } from "./odr-product"

export class Order {
  id:number;
  userId:number;
  orderId:string;
  odrProduct:OdrProduct[]=[];
  orderedDate:Date;
  deliveredDate:Date;
  address:Address;
  status:string;
  paymentMode:string;
  paymentStatus:string;
  paymentResponse:string;
  remarks:string;

}
