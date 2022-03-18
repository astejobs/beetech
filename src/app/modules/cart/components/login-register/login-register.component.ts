import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { OtpService } from './../../../../shared/services/otp.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, EventEmitter, Output, OnDestroy, AfterContentChecked, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit, AfterContentInit, OnDestroy {

  @Output() onEmit = new EventEmitter();
  loginForm: FormGroup;
  registerForm: FormGroup;
  hasAccount: boolean = true;
  loggedIn: boolean = false;

  subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private otpService: OtpService,
              private toastr: ToastrService,
              private authService: AuthenticationService) {

  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],   ///phoneNumber
      password: ['', [Validators.required]]
    });
    this.registerForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngAfterContentInit(): void {
    const account = this.authService.currentUserValue;
    const isLoggedIn = account?.token;
    if (isLoggedIn) {
      //console.log("+ is logged In");
      this.loggedIn = true;
    }
    this.onEmit.emit(this.loggedIn);
  }

  onLogin() {
    console.log(this.loginForm.value);
    this.subs.push(
      this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .subscribe(res => {
        this.loggedIn = true;
        this.onEmit.emit(this.authService.currentUserValue.user);
        this.toastr.success('You Are Logged In', 'Logged In', {
          timeOut: 1000,
        });
      },
      error => {
        console.log(error);
        //this.loggedIn = false;
        //this.onEmit.emit(this.loggedIn);
        this.toastr.error('Please Try Again', 'Error', {
          timeOut: 1000,
        });
      })
    );
  }

  onRegister(user: any) {
    console.log(user.value);
    this.subs.push(
      this.authService.registerUser(user.value)
      .subscribe(res => {
        this.hasAccount = true;
        this.onEmit.emit(this.loggedIn);
        this.toastr.success('User Created Successfully', 'CREATED', {
          timeOut: 1000,
        });
      },
      error => {
        console.log(error);
        this.hasAccount = false;
        this.onEmit.emit(this.loggedIn);
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
