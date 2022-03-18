import { Component, HostListener, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'estore';

  ngOnInit(): void {
    AOS.init({
      useClassNames: true,
      initClassName: false,
      animatedClassName: 'animated',
    });
  }
}
