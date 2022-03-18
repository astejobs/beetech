import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService: WebRequestService) { }

  addCategory(category: any) {
    return this.apiService.saveCategory(category);
  }

  getCategory(id: number) {
    return this.apiService.getCategory(id);
  }

  putCategory(id: number, category: any) {
    return this.apiService.putCategory(id, category);
  }

  deleteCategory(id: number) {
    return this.apiService.deleteCategory(id);
  }

  getAll() {
    return this.apiService.getAllCategories();
  }
}
