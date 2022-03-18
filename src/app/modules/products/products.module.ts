import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from 'src/app/components/material/material.module';
import { PipesModule } from './../../shared/modules/shared-module/pipes.module';
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';


@NgModule({
  declarations: [ProductsComponent,
    ProductDetailComponent,
    AllProductsComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    PipesModule,
    NgxImageZoomModule
  ]
})
export class ProductsModule { }
