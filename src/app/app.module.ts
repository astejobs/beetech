import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { JwtInterceptorService } from './shared/services/jwt-interceptor.service';
import { BlogService } from './shared/services/blog.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoyoutComponent } from './layout/loyout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { MaterialModule } from './components/material/material.module';
import { CarouselBannerComponent } from './components/carousel-banner/carousel-banner.component';
import { CarouselGeneralComponent } from './components/carousel-general/carousel-general.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/categories/products/products.component';
import { ProductItemComponent } from './components/categories/products/product-item.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './components/login/login.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { MyselectComponent } from './shared/components/myselect/myselect.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { PipesModule } from './shared/modules/shared-module/pipes.module';
import { Section1Component } from './components/section1/section1.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScrollEventDirectiveDirective } from './shared/directives/scroll-event-directive.directive';
import { Section2Component } from './components/section2/section2.component';
import { Section3Component } from './components/section3/section3.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogComponent } from './blog/blog.component';
import { ReadMorePipe } from './shared/pipes/read-more.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import {MatChipsModule} from '@angular/material/chips';
import { InvoiceComponent } from './components/invoice/invoice.component';


@NgModule({
  declarations: [
    AppComponent,
    LoyoutComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    CarouselBannerComponent,
    CarouselGeneralComponent,
    CategoriesComponent,
    ProductsComponent,
    ProductItemComponent,
    HomeComponent,
    ShoppingCartComponent,
    LoginComponent,
    ConfirmDialogComponent,
    MyselectComponent,
    Section1Component,
    NavbarComponent,
    ScrollEventDirectiveDirective,
    Section2Component,
    Section3Component,
    RegisterComponent,
    BlogComponent,
    ReadMorePipe,
    DialogComponent,
    MyOrdersComponent,
    InvoiceComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    CarouselModule,
    MaterialModule,
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    YouTubePlayerModule,
    PipesModule,
    RouterModule,
    MatDialogModule,
    MatChipsModule
  ],
  //exports: [ImagePipe],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true

    },
    BlogService
  ],
  bootstrap: [AppComponent],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
