import { Subscription } from 'rxjs';
import { ProductService } from './../../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/shared/classes/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, OnDestroy {
products: Product[];
subs: Subscription[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    let s1 = this.productService.getAll().subscribe(products => {
      this.products = products;
    });
    this.subs.push(s1);
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub => {
        sub.unsubscribe();
      })
  }

}
