import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  orders: any[] = [];
  totalOrdersCount: number=0;
  deliveredOrders: number = 0;
  paidOrders: number = 0;
  cancelledOrders: number = 0;
  codOrders: number = 0;
  DelOrders;


  constructor(private OrderService: OrderService) { }

  ngOnInit(): void {
    this.OrderService.getorders().subscribe(response => {
      this.orders = response;
      this.totalOrdersCount = this.orders.length;
      console.log("Array", this.orders);
      this.paidOrders = this.orders.filter(function (el) {
        return el.paymentStatus == "paid";
      }).length;
      this.codOrders = this.orders.filter(function (el) {
        return el.paymentStatus == "not_paid";
      }).length;
      this.deliveredOrders = this.orders.filter(function (el) {
        return el.status == "delivered" || el.status == "Delivered";
      }).length;
      this.cancelledOrders = this.orders.filter(function (el) {
        return el.status == "cancelled" || el.status == "Cancelled";
      }).length;
    })
  }
  getPaidOrders(e:any) {
    console.log(e);

    console.log(e.target.parentNode.firstChild.innerText);

    if (e.target.parentNode.firstChild.innerText == "Delivered Orders") {
      this.DelOrders = this.orders.filter(function (el) {
        return el.status == "delivered" || el.status == "Delivered";
      })
      console.log(this.DelOrders);
    }
    else if (e.target.parentNode.firstChild.innerText == "Cancelled Orders") {
      this.DelOrders = this.orders.filter(function (el) {
        return el.status == "cancelled" || el.status == "Cancelled";
      })
      console.log(this.DelOrders);
    }
    else if (e.target.parentNode.firstChild.innerText == "Paid Online Orders") {
      this.DelOrders = this.orders.filter(function (el) {
        return el.paymentStatus == "paid" || el.status == "Paid";
      })
      console.log(this.DelOrders);
    }
    else if (e.target.parentNode.firstChild.innerText == "COD Orders") {
      this.DelOrders = this.orders.filter(function (el) {
        return el.paymentStatus == "not_paid" || el.status == "Not_Paid";
      })
      console.log(this.DelOrders);
    }
  }
}
