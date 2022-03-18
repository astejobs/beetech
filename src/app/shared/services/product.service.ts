import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: WebRequestService) { }

  addProduct(product: any, images: any) {
    return this.apiService.saveProduct(product, images);
  }

  getProduct(id: number) {
    return this.apiService.getProduct(id);
  }

  putProduct(id: number, product: any) {
    return this.apiService.putProduct(id, product);
  }

  deleteProduct(id: number) {
    return this.apiService.deleteProduct(id);
  }

  getAll() {
    return this.apiService.getAllProducts();
  }
}
