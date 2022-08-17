import { OrderSearch } from './../classes/order-search';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Order } from './../classes/order';
import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 Fullorder = new BehaviorSubject<any>('');
 basketitems= new BehaviorSubject<any>('');
 EditOrder=new BehaviorSubject<any>('');

  constructor(private apiService: WebRequestService) { }

  saveOrder(order: Order){
    return this.apiService.saveOrder(order);
  }
  updateOrder(order:Order){
    console.log("Order in service",order);
    return this.apiService.updateOrder(order);

  }

  pay(request: any){
    return this.apiService.makePayment(request);
  }
  getPaytmResponse(parameters: any){
    return this.apiService.getPaytmResponce(parameters);
  }

  getOrders(orderSearch: OrderSearch) {
    return this.apiService.getOrders(orderSearch);
  }

  getPageOrders(orderSearch: OrderSearch) {
    return this.apiService.getPageOrders(orderSearch);
  }
  getorders(){
    return this.apiService.getorders();
  }
  getOrderss(id:number){
    return this.apiService.getOrderss(id);

  }
  getbasket(id){
    return this.apiService.getbasket(id);

  }
  getbasketItem(id){
    return this.apiService.getbasketItem(id);

  }
}
