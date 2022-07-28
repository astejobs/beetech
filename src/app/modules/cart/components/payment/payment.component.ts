import { OrderService } from './../../../../shared/services/order.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BasketItem } from 'src/app/shared/classes/BasketItem';
import { Basket } from 'src/app/shared/classes/Basket';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  isCOD: boolean = false;
  isPayOnline: boolean = false;
  switch: boolean = false;
  @Output() onPlace = new EventEmitter();
  @Output() onlinepay = new EventEmitter();
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  rzp1;
  paymentId;
  @Input() grandtotal;

  constructor(private orderService: OrderService,
    private auth: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {

  }

  options = {
    "key": "rzp_test_mHpj49RBQjamty", // Enter the Key ID generated from the Dashboard
    "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "BEE TECH KASHMIR",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    //"order_id":"",//This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "http://localhost:4200/",
    "handler": (response) => {
      this.onPlace.emit(response.razorpay_payment_id);
      this.Responsemessage(response);
      console.log(response.razorpay_payment_id);


    },
    "prefill": {
      "name": "Salman Quadir",
      "email": "najarsalman4@gmail.com",
      "contact": "7006584939"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "green"
    }
  };





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
    this.onPlace.emit();


  }

  pay() {

    // const paymentRequest: any = {
    //   //orderId: "order_21",
    //   customerId: "1001",
    //   transactionAmount: "500.11"
    // }

    if (this.isPayOnline == false) {
      this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: false
      });
      this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to Place  this Order?"
      this.dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.onPlaceOrder();
        }
        this.dialogRef = null;
      });
    }
    else if (this.isPayOnline == true) {
      this.generateOrderId();
      this.options.amount = this.grandtotal;
      this.rzp1 = new this.auth.nativeWindow.Razorpay(this.options);
      this.rzp1.open();

    }

    // var formData = new FormData();
    // formData.append("paymentRequest", paymentRequest);
    // this.orderService.pay(paymentRequest)
    //   .subscribe(res => {
    //     //this.redirectToPaytm(res);
    //     this.createPaymentForm(res);
    //     console.log(res);
    //   })
  }
  generateOrderId() {
    this.grandtotal = this.grandtotal * 100;
    console.log(this.grandtotal);
    let id = "ord_" + Math.random().toString(16).slice(2)
    console.log(id);

  }
  Responsemessage(response) {

    this.toastr.info('PayId:' + response.razorpay_payment_id, 'Your Payment Is Successfull', {
      timeOut: 7000,
      positionClass: 'toast-top-right',
      closeButton: true

    });
  }


  // redirectToPaytm(parameters: any) {
  //   /*  var formData = new FormData();
  //    Object.keys(parameters).map(index => {
  //      formData.append(index, parameters[index]);
  //    });
  //    console.log(parameters);
  //    console.log(formData.getAll('ORDER_ID'));
  //    this.orderService.getPaytmResponse(formData)
  //        .subscribe(res => {
  //          console.log(res);
  //    }); */
  //   //this.createPaymentForm(parameters);
  // }

  // createPaymentForm(parameters) {

  //   const my_form: any = document.createElement('form');
  //   my_form.name = 'paytm_form';
  //   my_form.method = 'post';
  //   my_form.action = 'https://securegw-stage.paytm.in/order/processTransaction';

  //   /* const myParams = Object.keys(this.paytm);
  //   for (let i = 0; i < myParams.length; i++) {
  //     const key = myParams[i];
  //     let my_tb: any = document.createElement('input');
  //     my_tb.type = 'hidden';
  //     my_tb.name = key;
  //     my_tb.value = this.paytm[key];
  //     my_form.appendChild(my_tb);
  //   }; */

  //   Object.keys(parameters).map(index => {
  //     let my_tb: any = document.createElement('input');
  //     my_tb.type = 'hidden';
  //     my_tb.name = index;
  //     my_tb.value = parameters[index];
  //     my_form.appendChild(my_tb);
  //   });
  //   console.log(my_form);
  //   document.body.appendChild(my_form);
  //   my_form.submit();


  //   // after click will fire you will redirect to paytm payment page.
  //   // after complete or fail transaction you will redirect to your CALLBACK URL
  // }

}
