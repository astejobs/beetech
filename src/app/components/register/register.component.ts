import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { OtpService } from 'src/app/shared/services/otp.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private otpService: OtpService,
              private toastr: ToastrService,
              private authService: AuthenticationService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onRegister(user: any) {
    console.log(user.value);
    this.subs.push(
      this.authService.registerUser(user.value)
      .subscribe(res => {
        this.router.navigate(['/login']);
        this.toastr.success('User Created Successfully', 'CREATED', {
          timeOut: 1000,
        });
      },
      error => {
        console.log(error);
        this.toastr.error('User Not Created', 'Error', {
          timeOut: 1000,
        });
      })
    );
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub => {
        sub.unsubscribe();
      })
  }

}
