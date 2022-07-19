import { OrderService } from './../../../../shared/services/order.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  isCOD: boolean = true;
  isPayOnline: boolean = false;
  switch: boolean = false;
  @Output() onPlace = new EventEmitter();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  payOnline() {
    this.switch = true;
    this.isCOD = false;
    this.isPayOnline = true;

  }
  payOffline() {
    this.switch = true;
    this.isPayOnline = false;
    this.isCOD = true;

  }

  onPlaceOrder() {
    this.onPlace.emit(true);


  }

  pay() {
    if (this.isPayOnline == false) {
      if (confirm("Do you really want to place this order")) {
        this.onPlaceOrder();
      }
    }

    const paymentRequest: any = {
      orderId: "12345",
      customerId: "100",
      transactionAmount: 500
    }
    var formData = new FormData();
    formData.append("paymentRequest", paymentRequest);
    this.orderService.pay(paymentRequest)
      .subscribe(res => {
        this.redirectToPaytm(res);
        console.log(res);
      })
  }

  redirectToPaytm(parameters: any) {
      var formData = new FormData();
     Object.keys(parameters).map(index => {
       formData.append(index, parameters[index]);
     });
     console.log(parameters);
     debugger;
     console.log(formData.getAll('ORDER_ID'));
     this.orderService.getPaytmResponse(formData)
         .subscribe(res => {
           console.log(res);
     });
    this.createPaymentForm(parameters);
  }

  createPaymentForm(parameters:any) {

    // const param=JSON.stringify(parameters);
    // console.log(param);
    const my_form: any = document.createElement('form');
    my_form.name = 'paytm_form';
    my_form.method = 'post';
    my_form.action = 'https://securegw-stage.paytm.in/order/process';

    /* const myParams = Object.keys(this.paytm);
    for (let i = 0; i < myParams.length; i++) {
      const key = myParams[i];
      let my_tb: any = document.createElement('input');
      my_tb.type = 'hidden';
      my_tb.name = key;
      my_tb.value = this.paytm[key];
      my_form.appendChild(my_tb);
    }; */
    Object.keys(parameters).map(index => {
      let my_tb: any = document.createElement('input');
      my_tb.type = 'hidden';
      my_tb.name = index;
      my_tb.value = parameters[index];
      my_form.appendChild(my_tb);
    });

    document.body.appendChild(my_form);
    my_form.submit();
    // after click will fire you will redirect to paytm payment page.
    // after complete or fail transaction you will redirect to your CALLBACK URL
  }

}
