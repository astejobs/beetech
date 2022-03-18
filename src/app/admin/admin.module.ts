import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

import { MaterialModule } from '../components/material/material.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DemoComponent } from './components/demo/demo.component';
import { UnitComponent } from './components/unit/unit.component';
import { CategoryComponent } from './components/category/category.component';
import { AddEditComponent } from './components/category/add-edit.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { PipesModule } from '../shared/modules/shared-module/pipes.module';


@NgModule({
  declarations: [
    AdminComponent,
    AddProductComponent,
    ProductsComponent,
    DashboardComponent,
    NavbarComponent,
    SidenavComponent,
    DemoComponent,
    UnitComponent,
    CategoryComponent,
    AddEditComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ImageCropperModule,
    PipesModule

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }
