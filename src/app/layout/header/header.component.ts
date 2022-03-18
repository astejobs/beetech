import { AppUser } from './../../shared/classes/app-user';
import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('clickHoverMenuTrigger') clickHoverMenuTrigger: MatMenuTrigger;
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  cartTotal=1500;
  totalItem: number = 0;
  isHidden:boolean = true;
  isHiddenMega:boolean = true;
  showStores:boolean = true;

    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private cartService: CartService) { }

    ngOnInit(): void {
      this.cartService.getProducts()
      .subscribe(res=> {
        this.totalItem = res.length;
      });

    }

    togglePages() {
      this.isHidden = !this.isHidden;
    }

    toggleStores() {
      this.showStores = !this.showStores;
    }
    toggleMega() {
      //this.isHiddenMega = !this.isHiddenMega;
    }

    showCartonMouseOver() {
      //if(!this.clickHoverMenuTrigger.menuOpen) {
      //  this.clickHoverMenuTrigger.openMenu();
     // }
    }
    hideCartonMouseLeave() {
      //if(this.clickHoverMenuTrigger.menuOpen) {
      //  this.clickHoverMenuTrigger.closeMenu();
      //}
    }

    logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }

    toggleSidenav(event) {
      this.toggle.emit(null);
    }

}
