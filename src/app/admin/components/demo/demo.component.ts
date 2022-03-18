import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  myForm: NgForm;
  name;
  phone;
  email;
  date;
  check;
  check1;
  select;
  radio;
  password;
  max;
  amount;
  textarea;

  hide = true;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(data) {
    console.log(data.value);
    //Swal.fire('Thank You', 'Form Submitted Check console','success');
  }
}
