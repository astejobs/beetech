import { AuthenticationService } from './../shared/services/authentication.service';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

@Component({
  selector: 'app-loyout',
  templateUrl: './loyout.component.html',
  styleUrls: ['./loyout.component.scss']
})
export class LoyoutComponent implements OnInit {
  //@ViewChild('toolbar', { static: false }) toolbar: ElementRef;
  private _router: Subscription;
  //@ViewChild(NavbarComponent) navbar: ElementRef<NavbarComponent>;
  public scrolled: boolean = false;
  showSidenav: boolean = false;

  constructor( private renderer : Renderer2,
               private router: Router,
               @Inject(DOCUMENT) private document: any,
               private element : ElementRef,
               public location: Location,
               private authenticationService: AuthenticationService) {}
    ngOnInit() {
        //var navbar : HTMLElement = this.element.nativeElement.children[0].children[0].children[0].sibling;
        var navbar : HTMLElement = this.element.nativeElement.querySelector('.mat-toolbar');
        //console.log(navbar);
        const number = window.scrollY;
        var _location = this.location.path();
        _location = _location.split('/')[2];

        if (number > 75 || window.pageYOffset > 75) {
          this.scrolled=true;
            navbar.classList.remove('app-navbar-Nobg');
            navbar.classList.add('app-navbar-bg');
        } else if (_location !== 'login' && this.location.path() !== '/nucleoicons') {
            this.scrolled = false;
            navbar.classList.add('app-navbar-Nobg');
            navbar.classList.remove('app-navbar-bg');
        }


    }



  /*   @HostListener("scroll")
    adjustHeights() {
       console.log("Into scroll");
      console.log("Into scroll");
      //var navbar : HTMLElement = this.element.nativeElement.children[0].children[0].children[0].children[0];
      var navbar : HTMLElement = this.element.nativeElement.querySelector('.mat-toolbar');
      const number = window.scrollY;
      var _location = this.location.path();
      _location = _location.split('/')[2]; console.log(_location +"split 2 path")

      if (number > 150 || window.pageYOffset > 150) { console.log("Scrolled Home...window.pageYOffset > 150 ");
          this.scrolled = true;
          navbar.classList.remove('app-navbar-Nobg');
          navbar.classList.add('app-navbar-bg');
      } else if (_location !== 'login' && this.location.path() !== '/nucleoicons') {
          this.scrolled = false;
          console.log("Home...window.pageYOffset < 150");
          navbar.classList.add('app-navbar-Nobg');
          navbar.classList.remove('app-navbar-bg');
      }
   } */

   logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

   toggleSidenav(event): void {
     console.log("togling...");
     this.showSidenav = !this.showSidenav;
   }

}
