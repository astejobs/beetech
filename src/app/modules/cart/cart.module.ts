import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../../components/material/material.module';
import { PipesModule } from './../../shared/modules/shared-module/pipes.module';
import { CartRoutingModule } from './cart-routing.module';
import { NgOtpInputModule } from  'ng-otp-input';

import { CartComponent } from './cart.component';
import { AllItemsComponent } from './components/all-items/all-items.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddressComponent } from './components/address/address.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { PaymentComponent } from './components/payment/payment.component';


@NgModule({
  declarations: [
    CartComponent,
    AllItemsComponent,
    CartItemComponent,
    CheckoutComponent,
    AddressComponent,
    LoginRegisterComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    PipesModule,
    MaterialModule,
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class CartModule { }
