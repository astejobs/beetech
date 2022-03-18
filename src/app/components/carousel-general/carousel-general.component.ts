import { BasketItem } from './../../shared/classes/BasketItem';
import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { CartService } from 'src/app/shared/services/cart.service';
import { Product } from 'src/app/shared/classes/product';
import { ImageService } from 'src/app/shared/services/image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'carousel-general',
  templateUrl: './carousel-general.component.html',
  styleUrls: ['./carousel-general.component.scss']
})
export class CarouselGeneralComponent implements OnInit, OnDestroy {

  slidesStore:any;
  products: Product[]=[];
  showCarousel = false;

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoWidth: false,
    margin: 20,
    autoHeight: true,
    autoplaySpeed:1000,
    //smartSpeed: 100,
    //responsiveRefreshRate: 100,
    //slideBy: 1,
    lazyLoad: true,
    dots: false,
    navSpeed: 1000,
    navText: [ '<i class="fas fa-chevron-circle-left"></i>', '<i class="fas fa-chevron-circle-right"></i>' ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1024: {
        items: 5
      }
    },
    nav: true
  }
  cartCount:number=0;
  favouriteCount:number=0;
  basketItem: BasketItem;
  sub1: Subscription;

  constructor(private toastr: ToastrService,
              private router: Router,
              private cartService: CartService,
              private productService: ProductService,
              private imageService: ImageService
    ) { }

  ngOnInit(): void {
    //this.fetchSlides();
    this.sub1 = this.productService.getAll()
    .subscribe(prods => {
      this.products = prods;
      this.showCarousel = true;
      console.log(this.products);
    });
  }

  addToCart(item: Product) {
    /* this.basketItem.product = item;
    this.basketItem.quantity=1;
    this.basketItem.price = item.price; */

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
   this.router.navigateByUrl("cart");
  }
  ngOnDestroy(): void {
      this.sub1.unsubscribe();
  }

}

/* const slides = [
  {
    id:1,
    src:'https://preview.colorlib.com/theme/ogani/img/categories/cat-5.jpg',
    alt:'Image_1',
    title:'Image_1'
  },
  {
    id:2,
    src:'https://preview.colorlib.com/theme/ogani/img/categories/cat-1.jpg',
    alt:'Image_2',
    title:'Image_3'
  },
  {
    id:3,
    src:'https://preview.colorlib.com/theme/ogani/img/categories/cat-3.jpg',
    alt:'Image_3',
    title:'Image_3'
  },
  {
    id:4,
    src:'https://preview.colorlib.com/theme/ogani/img/categories/cat-4.jpg',
    alt:'Image_4',
    title:'Image_4'
  },
  {
    id:5,
    src:'https://preview.colorlib.com/theme/ogani/img/categories/cat-2.jpg',
    alt:'Image_5',
    title:'Image_5'
  },
  {
    id:6,
    src:'https://preview.colorlib.com/theme/ogani/img/categories/cat-5.jpg',
    alt:'Image_1',
    title:'Image_1'
  },
  {
    id:7,
    src:'https://preview.colorlib.com/theme/ogani/img/categories/cat-1.jpg',
    alt:'Image_2',
    title:'Image_3'
  },
  {
    id:8,
    src:'https://preview.colorlib.com/theme/ogani/img/categories/cat-3.jpg',
    alt:'Image_3',
    title:'Image_3'
  },
  {
    id:9,
    src:'https://preview.colorlib.com/theme/ogani/img/categories/cat-4.jpg',
    alt:'Image_4',
    title:'Image_4'
  },
  {
    id:10,
    src:'https://preview.colorlib.com/theme/ogani/img/categories/cat-2.jpg',
    alt:'Image_5',
    title:'Image_5'
  }

] */
