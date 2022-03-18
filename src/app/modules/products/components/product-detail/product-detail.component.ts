import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from './../../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Product } from 'src/app/shared/classes/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id: number;
  product: Product;
  selectedImage: any;
  subs: Subscription[] = [];

  enableZoom: Boolean = true;
  myThumbnail="https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
  myFullresImage="https://wittlock.github.io/ngx-image-zoom/assets/fullres.jpg";

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private sanitizer: DomSanitizer,
              private cartService: CartService,
              private toastr: ToastrService) {

              }

  ngOnInit() {
   this.subs.push(this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.getProduct(this.id);
      }));
  }

  getProduct(id:any) {
    this.subs.push(this.productService.getProduct(id).subscribe(product => {
        this.product = product;
        let imgName = this.product.productImages[0];
        this.selectedImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.product.images[imgName.valueOf()]);
        console.log(this.product);
      }));
  }

  onSelectImage(img: any) {
    this.selectedImage = this.sanitizer.bypassSecurityTrustResourceUrl(img);
    console.log(this.selectedImage);
  }

  addToCart(product: Product) { console.log("adding: "+ product.name);
    this.cartService.addtoCart(product);
    this.toastr.success('Click to Checkout', 'Added To Cart', {
      timeOut: 1000,
    })
  }

ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
}

}
