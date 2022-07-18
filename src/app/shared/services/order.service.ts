import { OrderSearch } from './../classes/order-search';
import { Observable } from 'rxjs';
import { Order } from './../classes/order';
import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apiService: WebRequestService) { }

  saveOrder(order: Order){
    return this.apiService.saveOrder(order);
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
}
