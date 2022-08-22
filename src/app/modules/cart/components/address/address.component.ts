import { AppUser } from './../../../../shared/classes/app-user';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/shared/classes/Address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {

  @Output() onEmit = new EventEmitter();
  addressForm: FormGroup;
  subs: Subscription[] = [];
  addresses: any[] = [];
  user: AppUser = new AppUser();
  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      pincode: ['', [Validators.required]]
    });
    this.getAddesses();

  }

  onSubmit() {
    console.log(this.addressForm.value);

    this.subs.push(
      this.authService.addShippingAddress(this.addressForm.value)
      .subscribe(address => {
        this.addresses.push(address);
        this.onEmit.emit(address);
        this.toastr.success('Address Added', 'Success', {
          timeOut: 1000,
        });
      },
      error => {
        console.log(error);
        //this.onEmit.emit(this.loggedIn);
        this.toastr.error('Address Not Added', 'Error', {
          timeOut: 1000,
        });
      })
    );

  }

  getAddesses() {
    const account = this.authService.currentUserValue;
    const isLoggedIn = account?.token;
    if (isLoggedIn) {
      this.user = account?.user;
      this.subs.push(
        this.authService.getAllAddresses(this.user?.id)
        .subscribe(res => { console.log(res);
          this.addresses = res;
        },
        error => {
          console.log(error);
        })
      );
    }
  }

  useAddress(address: Address) {
    this.addressForm.patchValue({
      id: address?.id,
      name: address?.name,
      phoneNumber: address.phoneNumber,
      pincode: address?.pincode,
      landmark: address?.landmark,
      address: address.address
    });
  }

ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
}

}
