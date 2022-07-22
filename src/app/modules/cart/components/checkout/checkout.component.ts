import { AddressComponent } from './../address/address.component';
import { OrderService } from './../../../../shared/services/order.service';
import { Order } from './../../../../shared/classes/order';
import { Address } from './../../../../shared/classes/Address';
import { VerifyOtp } from './../../../../shared/classes/verify-otp';
import { SmsRequest } from './../../../../shared/classes/sms-request';
import { ToastrService } from 'ngx-toastr';
import { OtpService } from './../../../../shared/services/otp.service';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Config } from 'ng-otp-input/lib/models/config';
import { Subscription } from 'rxjs';
import { Basket } from 'src/app/shared/classes/Basket';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;

  basket: Basket = new Basket();
  totalItems: number = 0;
  grandTotal: number = 0;
  hasItems: boolean = false;
  subs: Subscription[] = [];
orderidd;
  phoneNumber: any;
  otpRequest: SmsRequest = new SmsRequest();
  isLoggedIn: boolean;
  hasAddress: boolean = false;
  selectedAddress: Address;

  isEditable = false;

  otpVerificationDone: boolean = true;
  otp: string;
  showOtpComponent = false;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  @ViewChild('AddressComponent') addressComp: AddressComponent;
  config: Config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  constructor(private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder,
    private optService: OtpService,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getBasket();
    this.hasLoggedIn();
  }

  getBasket() {
    this.subs.push(this.cartService.getProducts()
      .subscribe(basket => {
        if (basket != null) {
          console.log("bbbbbbbb")
          this.basket = basket;
          if (this.basket.basketItems) {
            this.totalItems = 0;
            this.grandTotal = 0;
            this.basket.basketItems.forEach(item => {
              this.totalItems += item.quantity;
              this.grandTotal += (item.product.price) * (item.quantity);
            });
            this.hasItems = true;
          } console.log("Total" + this.grandTotal);

        } else {
          this.totalItems = 0;
        }
      }));
  }

  hasLoggedIn() {
    const account = this.authService.currentUserValue;
    if (account?.token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  getOTP() {
    this.otpRequest.phoneNumber = "+91" + this.phoneNumber;
    console.log(this.otpRequest);
    this.subs.push(
      this.optService.getOtp(this.otpRequest)
        .subscribe(res => {
          console.log(res);
          this.toastr.success('OTP Sent Successfully', 'OTP SENT', {
            timeOut: 1000,
          });
          this.showOtpComponent = true;
        },
          error => {
            console.log(error);
            this.toastr.error('OTP not Sent', 'Warning', {
              timeOut: 1000,
            });
          })
    );
  }
  onOtpChange(otp) {
    if (otp.length == 5) {
      const verifyOtpRequest: VerifyOtp = new VerifyOtp();
      verifyOtpRequest.otp = otp;
      verifyOtpRequest.phoneNumber = this.phoneNumber;

      this.subs.push(
        this.optService.verifyOtp(verifyOtpRequest)
          .subscribe(res => {
            this.toastr.success('Number Vefified Successfully', 'Verified!', {
              timeOut: 1000,
            });
            this.otpVerificationDone = true;
            this.showOtpComponent = false;
          },
            error => {
              console.log(error);
              this.toastr.error('Number not Verified', 'Try Again', {
                timeOut: 1000,
              });
            })
      );
    }
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
  }
  onCheckOut(e) {
    console.log("Processing Checkout...");

    this.router.navigate(['/cart/checkout']);
  }

  onVerify(user) {
    if (user.id) {
      this.isLoggedIn = true;
      this.cartService.isLoggedIn = true;
      this.subs.push(this.cartService.getUserBasket(user.id)
        .subscribe(basket => {
          this.cartService.synchroniseCart(basket);
        }));
      this.addressComp.getAddesses();
    }

    setTimeout(() => {
      this.myStepper.next();
    }, 1);
  }

  onAddAddress(address: Address) {
    this.cartService.setCartAddress(address);
    this.hasAddress = true;
    this.selectedAddress = address;
    setTimeout(() => {           // or do some API calls/ Async events
      this.myStepper.next();
    }, 1);
  }

  placeOrder(paymentId) {
    console.log(paymentId, "");
    if (!paymentId) {
      console.log(this.selectedAddress);
      const order: Order = new Order();
      order.address = this.selectedAddress;
      this.generateOrderId();
      order.orderId=this.orderidd;
      order.paymentMode = 'Offline';
      order.paymentStatus = 'not_paid';
      console.log("placing order...");
      console.log(order);
      this.subs.push(this.orderService.saveOrder(order)
        .subscribe(res => {
          this.toastr.success('Order placed  Successfully', 'Successfull!', {
            timeOut: 3000,
          });
          this.clearBasket();
          console.log(res.message);
          this.router.navigate(['/products']);
        }));


    }

    else if (paymentId) {

      console.log(this.selectedAddress);
      const order: Order = new Order();
      order.address = this.selectedAddress;
      order.paymentMode = 'online';
      order.paymentStatus = "paid";
      order.paymentResponse = paymentId;
      console.log("placing order...");
      console.log(order);
      this.subs.push(this.orderService.saveOrder(order)
        .subscribe(res => {
          this.toastr.success('Order placed  Successfully', 'Successfull!', {
            timeOut: 3000,
          });
          this.clearBasket();
          console.log(res.message);
          this.router.navigate(['/products']);

        }));


    }
  }



  clearBasket() {
    localStorage.setItem('basket', null);
    this.cartService.removeAllCart();
    this.cartService.getUserBasket(this.authService.currentUserValue?.user?.id)
      .subscribe(basket => {
        this.cartService.basket = basket;
        this.cartService.cart.next(this.cartService.basket);
        this.getBasket();
      });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
  generateOrderId(){
    this.orderidd = "ord_" + Math.random().toString(16).slice(2)
    console.log(this.orderidd);

  }


}
