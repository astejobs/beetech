import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/classes/product';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
@Input() product: Product;
cartCount:number=0;
favouriteCount:number=0;

  constructor(private router:Router,
              private cartService: CartService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSelect(id:any) { console.log(id)
    //this.router.navigate("/products"+ id);
  }
  addToCart(item: any) {
    this.cartCount++;
    this.cartService.addtoCart(item);
    this.toastr.success('Click to Checkout', 'Added To Cart', {
      timeOut: 1000,
    })
    .onTap
    .pipe(take(1))
    .subscribe(() => this.toasterClickedHandler());
  }
  addToFavourites(item: any) {
    this.favouriteCount++;
    this.toastr.success('Added to Favourites!', 'Fovourite Item', {
      timeOut: 1000,
    });
  }

  toasterClickedHandler() {
   this.router.navigateByUrl("shopping-cart");
  }

}
