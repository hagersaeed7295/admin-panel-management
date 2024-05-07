import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
