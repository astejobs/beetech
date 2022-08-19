import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/shared/classes/order';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  OrderForm!: FormGroup;
  orderStatus = ["Ordered", "Delivered", "Cancelled", "In-Transit"];
  paymentStatus = ["paid", "not_paid"];
  Order: any;
  constructor(private formbuilder: FormBuilder,
    private orderService: OrderService,
    private dialogRef:MatDialog,
    private toastr:ToastrService

    ) { }

  ngOnInit(): void {
    this.OrderForm = this.formbuilder.group({
      OrderedDate: ['', Validators.required],
      DeliveryDate: ['', Validators.required],
      OrderStatus: ['', Validators.required],
      PaymentStatus: ['', Validators.required],
      Address: ['', Validators.required],



    })
    this.orderService.EditOrder.subscribe((res) => {
      this.Order = res;
      this.OrderForm.controls['OrderedDate'].setValue(res.orderedDate);
      this.OrderForm.controls['DeliveryDate'].setValue(res.deliveredDate);
      this.OrderForm.controls['OrderStatus'].setValue(res.status);
      this.OrderForm.controls['PaymentStatus'].setValue(res.paymentStatus);
      this.OrderForm.controls['Address'].setValue(res.address.address);


    })

  }
  editOrder() {
    console.log(this.OrderForm);
    console.log("======",this.Order);


    const order:Order = new Order();
    order.address=this.Order.address;
    order.deliveredDate=this.OrderForm.controls['DeliveryDate'].value;
    order.orderedDate=this.OrderForm.controls['OrderedDate'].value;
    order.id=this.Order.id;
    order.userId=this.Order.user.id;
    order.orderId=this.Order.orderId;
    // order.products=this.Order.products;
    order.paymentMode=this.Order.paymentMode;
    order.paymentStatus=this.OrderForm.controls['PaymentStatus'].value;
    order.status=this.OrderForm.controls['OrderStatus'].value;
    order.paymentResponse=this.Order.paymentResponse;
    this.orderService.updateOrder(order).subscribe(res=>{
      console.log(res);
      console.log("UserId....",this.Order.user.id);
    })
    this.toastr.success("Order Updated Successfully !",'Successfull',{
      timeOut:2000
    })
    this.dialogRef.closeAll();

  }
  closeDialog(){
    this.dialogRef.closeAll();

  }
}
